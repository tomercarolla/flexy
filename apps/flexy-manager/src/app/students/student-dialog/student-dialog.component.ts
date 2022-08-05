import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Student } from "@flexy/shared";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FlexyService } from "@flexy/shared";
import { ManagerStore } from "../../store/manager.store";
import { ManagerQuery } from "../../store/manager.query";
import { ConfirmationDialogComponent, ConfirmDialogModel } from "@flexy/ui";
import { filter, forkJoin, map, Subscription, tap } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import * as  Highcharts from "highcharts";

interface DialogData extends Student {
  title: string;
  isEdit: boolean;
}

interface Year {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-student-dialog",
  templateUrl: "./student-dialog.component.html",
  styleUrls: ["./student-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentDialogComponent implements OnInit, OnDestroy {
  form: FormGroup;
  durationInSeconds = 5;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions$ = this.flexyService.getStudentLatestResults(this.data.phone).pipe(
    filter(Boolean),
    map(data => {
      const latestResultsArray = JSON.parse((data as unknown as string).replaceAll("],[", ","));
      const dates = [];
      const visual = [];
      const movement = [];
      const auditory = [];
      latestResultsArray.map(res => {
        dates.push(res.date);
        visual.push(res.visual);
        movement.push(res.movement);
        auditory.push(res.auditory);
      });
      const dataset = { "dates": dates, "visual": visual, "movement": movement, "auditory": auditory };
      return {
        chart: {
          type: "column",
          width: 780
        },
        title: {
          text: "התקדמות תלמיד"
        },
        xAxis: {
          type: "datetime",
          categories: dataset.dates.map(date => {
            return Highcharts.dateFormat("%d-%m-%Y", new Date(date).getTime());
          })
        },
        yAxis: {
          min: 0,
          max: 100,
          title: {
            text: "גובה ציון"
          }
        },
        legend: {
          reversed: true,
          rtl: true
        },
        series: [
          {
            name: "סגנון שמיעתי",
            data: dataset.movement
          },
          {
            name: "סגנון תנועתי",
            data: dataset.auditory
          },
          {
            name: "סגנון חזותי",
            data: dataset.visual
          }
        ],
        colors: [
          "#DBA88B", "#4F5F76", "#E9B44C"
        ]
      };
    })
  );

  saveStudentSubscription: Subscription | null = null;
  deleteStudentSubscription: Subscription | null = null;
  studentAnswersSubscription: Subscription | null = null;

  years: Year[] = [
    { value: "ח", viewValue: "ח" },
    { value: "ט", viewValue: "ט" },
    { value: "י", viewValue: "י" },
    { value: "יא", viewValue: "יא" },
    { value: "יב", viewValue: "יב" },
    { value: "סיים תהליך", viewValue: "סיים תהליך" }
  ];

  isLoading$ = this.managerQuery.selectIsLoading$;
  selectQuestionsByUser$ = this.managerQuery.selectStudentsAnswers$;
  selectStudentsAnswers$ = this.managerQuery.selectStudentsLatestResults$;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialog,
    private fb: FormBuilder,
    private flexyService: FlexyService,
    private managerStore: ManagerStore,
    private managerQuery: ManagerQuery,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    if (this.data.isEdit) {
      const studentAnswers = this.flexyService.getStudentAnswers(this.data.phone);
      const studentLatestResults = this.flexyService.getStudentLatestResults(this.data.phone);
      this.studentAnswersSubscription = forkJoin([studentAnswers, studentLatestResults]).pipe(
        tap(
          (questions: any) => {
            if (questions[0] !== null || questions[1] !== null) {
              const questionsArray = JSON.parse(questions[0]);
              const latestResultsArray = JSON.parse(questions[1].replaceAll("],[", ","));
              this.managerStore.update(store => {
                return {
                  ...store,
                  studentAnswers: questionsArray,
                  studentLatestResults: latestResultsArray
                };
              });
            }
          }
        )
      ).subscribe();
      this.form = this.fb.group({
        firstName: this.fb.control(this.data.firstName, [Validators.required]),
        lastName: this.fb.control(this.data.lastName, [Validators.required]),
        phone: this.fb.control("0" + this.data.phone, [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(10),
          Validators.maxLength(10)
        ]),
        school: this.fb.control(this.data.school, [Validators.required]),
        year: this.fb.control(this.data.year, [Validators.required]),
        studentProgress: this.fb.control(this.data.studentProgress, [Validators.required])
      });
    } else {
      this.form = this.fb.group({
        firstName: this.fb.control("", [Validators.required]),
        lastName: this.fb.control("", [Validators.required]),
        phone: this.fb.control("", [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(10),
          Validators.maxLength(10)
        ]),
        school: this.fb.control("", [Validators.required]),
        year: this.fb.control("", [Validators.required])
      });
    }
  }

  close() {
    this.dialogRef.closeAll();
  }

  save() {
    this.managerStore.update(store => {
      return {
        ...store,
        isLoading: true
      };
    });
    this.saveStudentSubscription = this.flexyService.addUpdateStudentProfile(this.data.id, this.form.value).pipe(
      tap(data => {
        if (data.statusCode) {
          switch (data.statusCode) {
            case 200:
              this.close();
              this.openSnackBar(data.message + "", "x", "success");
              break;

            case 401:
              this.managerStore.update(store => {
                return {
                  ...store,
                  isLoading: false
                };
              });
              this.openSnackBar(data.message + "", "x", "failed");
              break;
          }
        }
      })
    ).subscribe();
  }

  resetForm() {
    this.form.reset();
  }

  openSnackBar(message, action, status) {
    this._snackBar.open(message, action, {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      panelClass: ["flexy-snackbar", status],
      duration: this.durationInSeconds * 1000
    });
  }

  deleteStudent() {
    const title = `מחיקת תלמיד`;
    const message = `האם בטוח למחוק משתמש: ${this.data.firstName} ${this.data.lastName}?`;

    const dialogData = new ConfirmDialogModel(title, message);

    const deleteDialog = this.dialogRef.open(ConfirmationDialogComponent, {
      width: "500px",
      data: dialogData
    });

    deleteDialog.afterClosed().subscribe(dialogResult => {
      this.managerStore.update(store => {
        return {
          ...store,
          isLoading: true
        };
      });
      if (dialogResult) {
        this.deleteStudentSubscription = this.flexyService.deleteStudent(this.data.phone).pipe(
          tap(res => {
            if (res.statusCode) {
              switch (res.statusCode) {
                case 200:
                  this.close();
                  this.openSnackBar(res.message + "", "x", "success");
                  break;

                case 401:
                  this.managerStore.update(store => {
                    return {
                      ...store,
                      isLoading: false
                    };
                  });
                  this.openSnackBar(res.message + "", "x", "failed");
                  break;
              }
            }
          })
        ).subscribe();
      } else {
        this.managerStore.update(store => {
          return {
            ...store,
            isLoading: false
          };
        });
      }
    });
  }

  ngOnDestroy() {
    this.saveStudentSubscription?.unsubscribe();
    this.deleteStudentSubscription?.unsubscribe();
    this.studentAnswersSubscription?.unsubscribe();
    this.managerStore.update(store => {
      return {
        ...store,
        isLoading: false
      };
    });
    this.managerStore.update(store => {
      return {
        ...store,
        studentAnswers: null,
        studentLatestResults: null
      };
    });
  }
}
