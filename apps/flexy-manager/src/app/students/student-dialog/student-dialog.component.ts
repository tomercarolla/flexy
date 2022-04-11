import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Student } from "../../../../../../libs/shared/user.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FlexyService } from "../../../../../../libs/shared/flexy.service";
import { ManagerStore } from "../../store/manager.store";
import { ManagerQuery } from "../../store/manager.query";
import { ConfirmationDialogComponent, ConfirmDialogModel } from "@flexy/ui";
import { Subscription, tap } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

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
  saveStudentSubscription: Subscription | null = null;
  deleteStudentSubscription: Subscription | null = null;

  years: Year[] = [
    { value: "ח", viewValue: "ח" },
    { value: "ט", viewValue: "ט" },
    { value: "י", viewValue: "י" },
    { value: "יא", viewValue: "יא" },
    { value: "יב", viewValue: "יב" },
    { value: "סיים", viewValue: "סיים תהליך" }
  ];

  isLoading$ = this.managerQuery.selectIsLoading$;
  selectQuestionsByUser$ = this.managerQuery.selectStudentsAnswers$;

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
    this.flexyService.getStudentAnswers(this.data.phone).pipe(
      tap(
        (questions: any) => {
          if (questions) {
            const questionsArray = JSON.parse(questions);
            this.managerStore.update(store => {
              return {
                ...store,
                studentAnswers: questionsArray
              };
            });
          }
        }
      )
    ).subscribe();
    if (this.data.isEdit) {
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

  deleteStudent(student: Student) {
    const title = `מחיקת תלמיד`;
    const message = `האם בטוח למחוק משתמש: ${this.data.firstName} ${this.data.lastName}`;

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
        this.deleteStudentSubscription = this.flexyService.deleteStudent(student.phone).pipe(
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
      }
    });
  }

  ngOnDestroy() {
    this.saveStudentSubscription?.unsubscribe();
    this.deleteStudentSubscription?.unsubscribe();
    this.managerStore.update(store => {
      return {
        ...store,
        isLoading: false
      };
    });
    this.managerStore.update(store => {
      return {
        ...store,
        studentAnswers: null
      };
    });
  }
}
