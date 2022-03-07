import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {QuestionInterface} from "../../../../../../libs/shared/question.interface";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { combineLatest, filter, lastValueFrom, Subscription, take, tap } from "rxjs";
import {FlexyService} from "../../../../../../libs/shared/flexy.service";
import {QuestionQuery} from "../../store/question.query";
import {QuestionStore} from "../../store/question.store";
import {Location} from "@angular/common";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInOut', [
      transition('* <=> *', [
        style({transform: 'translateX(100%)'}),
        animate('0.4s .4s ease-in', style({transform: 'translateX(0%)'}))
      ]),
    ])
  ]
})

export class QuestionComponent implements OnInit, OnDestroy {
  @Input() questions?: QuestionInterface[] | null;
  answers = [
    {value: 1, text: '1 - לא מתאים בכלל'},
    {value: 2, text: '2 - מתאים לעתים רחוקות'},
    {value: 3, text: '3 - מתאים לפעמים'},
    {value: 4, text: '4 - מתאים לעיתים קרובות'},
    {value: 5, text: '5 - כמעט תמיד מתאים'},
  ];
  answerFormControl: FormControl;
  currentQuestion$ = this.questionQuery.currentQuestion$;
  allQuestions$ = this.questionQuery.selectQuestions$;
  progress: number;
  subscription: Subscription | null = null;

  constructor(private activatedRoute: ActivatedRoute,
              private questionQuery: QuestionQuery,
              private questionStore: QuestionStore,
              private flexyService: FlexyService,
              private router: Router,
              private fb: FormBuilder,
              private location: Location) {
  }

  ngOnInit() {
    this.initQuestionForm();
    this.subscription = this.flexyService.getAllQuestions().subscribe((questions: any) => {
      this.questionStore.update(store => {
        return {
          ...store,
          questions: questions.Table,
          progress: this.progress
        }
      })
      combineLatest([this.activatedRoute.params, this.questionQuery.selectQuestions$.pipe(
        filter(questions => !!questions.length)
      )])
        .pipe(
          tap(([params, questions]) => {
            questions.length && this.questionStore.update(store => {
              //check if has answer and put in radio button
              const storage = JSON.parse(sessionStorage.getItem('questions'));
              let currentAnswer = null;
              if (storage?.length) {
                currentAnswer = storage[+params['questionId'] - 1].answer;
                this.progress = Math.floor((Math.floor(storage.filter(q => q.answer !== null).length) / questions.length) * 100);
              } else {
                this.router.navigate(['question', 1]);
              }

              //form reset
              this.answerFormControl.setValue(currentAnswer);

              return {
                ...store,
                //update answer in store
                currentQuestion: questions.find(q => q.id === +params['questionId']),
                progress: this.progress
              }
            })
          })
        ).subscribe();
    });
  }

  initQuestionForm() {
    this.answerFormControl = this.fb.control('', [Validators.required])
  }

  async nextQuestion(question: QuestionInterface) {
    const questionClone = {...question};
    const storage = JSON.parse(sessionStorage.getItem('questions'));
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
      await this.router.navigate(['results']);
    } else {
      await this.router.navigate(['question', questionClone.id + 1]);
    }
  }

  previousQuestion() {
    this.location.back();
  }

  questionLearningTypeTranslate(type: string) {
    return type === 'visual' ? 'ויזואלי' : type === 'movement' ? 'תנועתי' : 'שמיעתי';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
