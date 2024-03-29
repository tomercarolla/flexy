import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { QuestionInterface } from "@flexy/shared";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest, filter, lastValueFrom, Subscription, take, tap } from "rxjs";
import { FlexyService } from "@flexy/shared";
import { QuestionQuery } from "../../store/question.query";
import { QuestionStore } from "../../store/question.store";
import { animate, style, transition, trigger } from "@angular/animations";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "@flexy/auth";
import { AboutDialogComponent } from "@flexy/ui";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("slideInOut", [
      transition("* <=> *", [
        style({ transform: "translateX(100%)" }),
        animate("0.4s .4s ease-in", style({ transform: "translateX(0%)" }))
      ])
    ])
  ]
})

export class QuestionComponent implements OnInit, OnDestroy {
  @Input() questions?: QuestionInterface[] | null;
  answers = [
    { value: 1, text: "1 - לא מתאים בכלל" },
    { value: 2, text: "2 - מתאים לעתים רחוקות" },
    { value: 3, text: "3 - מתאים לפעמים" },
    { value: 4, text: "4 - מתאים לעיתים קרובות" },
    { value: 5, text: "5 - כמעט תמיד מתאים" }
  ];
  durationInSeconds = 5;
  visualLearningPoints = 0;
  movementLearningPoints = 0;
  auditoryLearningPoints = 0;
  answerFormControl: FormControl;
  progress = 0;
  latestQuestAnsIndex = 0;
  currentQuestion$ = this.questionQuery.currentQuestion$;
  allQuestions$ = this.questionQuery.selectQuestions$;
  progress$ = this.questionQuery.selectProgress$;
  sendAnswers = false;
  allQuestionsSubscription: Subscription | null = null;
  updateAnswersSubscription: Subscription | null = null;

  constructor(private activatedRoute: ActivatedRoute,
              private questionQuery: QuestionQuery,
              private questionStore: QuestionStore,
              private flexyService: FlexyService,
              private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.initQuestionForm();
    this.allQuestionsSubscription = this.flexyService.getAllQuestions().subscribe((questions: any) => {
      this.questionStore.update(store => {
        return {
          ...store,
          questions: questions.Table,
          progress: 0
        };
      });
      combineLatest([this.activatedRoute.params, this.questionQuery.selectQuestions$.pipe(
        filter(questions => !!questions.length)
      )])
        .pipe(
          tap(([params, questions]) => {
            questions.length && this.questionStore.update(store => {
              //check if has answer and put in radio button
              const storage = JSON.parse(sessionStorage.getItem("questions"));
              let currentAnswer = null;
              let currentAnswerIndex = null;
              if (storage?.length) {
                currentAnswer = storage[+params["questionId"] - 1].answer;
                currentAnswerIndex = storage[+params["questionId"] - 1].id;
                this.getLatestAnsweredQuestionIndex();
                if (currentAnswerIndex > this.latestQuestAnsIndex) {
                  this.router.navigate(["question", this.latestQuestAnsIndex]);
                }
                this.progress = Math.floor((Math.floor(storage.filter(q => q.answer !== null).length) / questions.length) * 100);
                if (this.progress === 100) {
                  this.sendAnswers = true;
                }
              } else {
                this.questionStore.update(store => {
                  return {
                    ...store,
                    progress: 0
                  };
                });
                this.sendAnswers = false;
                this.router.navigate(["question", 1]);
              }

              //form reset
              this.answerFormControl.setValue(currentAnswer);

              return {
                ...store,
                //update answer in store
                currentQuestion: questions.find(q => q.id === +params["questionId"]),
                progress: this.progress
              };
            });
          })
        ).subscribe();
    });
  }

  initQuestionForm() {
    this.answerFormControl = this.fb.control({ value: "", disabled: this.sendAnswers }, [Validators.required]);
  }

  async nextQuestion(question: QuestionInterface) {
    const questionClone = { ...question };
    const storage = JSON.parse(sessionStorage.getItem("questions"));
    if (storage?.length) {
      storage[questionClone.id - 1].answer = this.answerFormControl.value;
      this.progress = Math.floor((Math.floor(storage.filter(q => q.answer !== null).length) / storage.filter(q => q.answer).length) * 100);
      sessionStorage.setItem(`questions`, JSON.stringify(storage));
    } else {
      const questions = await lastValueFrom(this.allQuestions$.pipe(take(1)));
      questions[questionClone.id - 1].answer = this.answerFormControl.value;
      sessionStorage.setItem(`questions`, JSON.stringify(questions));
    }

    if (question.id === 30) {
      this.questionStore.update((store) => {
        storage.forEach(question => {
          switch (question.learningType) {
            case "visual":
              return this.visualLearningPoints += question.answer;
            case "movement":
              return this.movementLearningPoints += question.answer;
            case "auditory":
              return this.auditoryLearningPoints += question.answer;
          }
        });
        return {
          ...store,
          visualLearningPoints: (this.visualLearningPoints * 100) / 50,
          movementLearningPoints: (this.movementLearningPoints * 100) / 50,
          auditoryLearningPoints: (this.auditoryLearningPoints * 100) / 50
        };
      });
      const latestResult = [{
        date: new Date(),
        visual: (this.visualLearningPoints * 100) / 50,
        movement: (this.movementLearningPoints * 100) / 50,
        auditory: (this.auditoryLearningPoints * 100) / 50
      }];
      const latestResultStringify = JSON.stringify(latestResult);
      this.updateAnswersSubscription = this.flexyService.updateAnswers(latestResultStringify, {
        visual: (this.visualLearningPoints * 100) / 50,
        movement: (this.movementLearningPoints * 100) / 50,
        auditory: (this.auditoryLearningPoints * 100) / 50
      }).pipe(
        tap(data => {
          if (data.statusCode) {
            switch (data.statusCode) {
              case 200:
                this.openSnackBar(data.message + "", "x", "success");
                this.router.navigate(["results"]);
                this.questionStore.update(store => {
                  return {
                    ...store,
                    progress: 0
                  };
                });
                this.sendAnswers = true;
                break;

              case 401:
                this.openSnackBar(data.message + "", "x", "failed");
                break;
            }
          }
        })
      ).subscribe();
    } else {
      this.router.navigate(["question", questionClone.id + 1]);
    }
  }

  getLatestAnsweredQuestionIndex() {
    const storage = JSON.parse(sessionStorage.getItem("questions"));
    if (storage.length) {
      storage.some(question => {
          if (question.answer === null) {
            return this.latestQuestAnsIndex = question.id;
          } else {
            this.latestQuestAnsIndex = question.id;
          }
        }
      );
    }
  }

  openSnackBar(message, action, status) {
    this._snackBar.open(message, action, {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      panelClass: ["flexy-snackbar", status],
      duration: this.durationInSeconds * 1000
    });
  }

  previousQuestion() {
    let curr: QuestionInterface;
    this.currentQuestion$.subscribe(currQuestion => curr = currQuestion);
    this.router.navigate(["question", curr.id - 1]);
  }

  goToResults() {
    this.router.navigateByUrl("results");
  }

  logout() {
    this.questionStore.update(store => {
      return {
        ...store,
        progress: 0
      };
    });
    this.authService.logout();
  }

  openAboutDialog(): void {
    this.dialog.open(AboutDialogComponent, {
      width: '650px',
      data: {
        title: 'אודות',
        isAbout: true,
      }
    });
  }

  ngOnDestroy() {
    this.allQuestionsSubscription?.unsubscribe();
    this.updateAnswersSubscription?.unsubscribe();
  }
}
