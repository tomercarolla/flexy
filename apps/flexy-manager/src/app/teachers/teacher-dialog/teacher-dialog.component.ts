import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { UserInterface } from "../../../../../../libs/shared/user.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { passwordMatchingValidator } from "../../../../../../libs/shared/password-validation.directive";
import { FlexyService } from "../../../../../../libs/shared/flexy.service";
import { Subscription, tap } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmationDialogComponent, ConfirmDialogModel } from "@flexy/ui";
import { ManagerQuery } from "../../store/manager.query";
import { ManagerStore } from "../../store/manager.store";

interface DialogData extends UserInterface {
  title: string;
  isEdit: boolean;
}

@Component({
  selector: "app-teacher-dialog",
  templateUrl: "./teacher-dialog.component.html",
  styleUrls: ["./teacher-dialog.component.scss"]
})
export class TeacherDialogComponent implements OnInit, OnDestroy {

  managerForm: FormGroup;
  isLoading$ = this.managerQuery.selectIsLoading$;
  durationInSeconds = 5;
  result: "";
  saveManagerSubscription: Subscription | null = null;
  deleteManagerSubscription: Subscription | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialog,
    private fb: FormBuilder,
    private flexyService: FlexyService,
    private managerQuery: ManagerQuery,
    private managerStore: ManagerStore,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    if (this.data.isEdit) {
      this.managerForm = this.fb.group({
        firstName: [this.data.firstName, [Validators.required]],
        lastName: [this.data.lastName, [Validators.required]],
        userName: [this.data.userName, [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
        phone: this.fb.control("0" + this.data.phone, [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(10),
          Validators.maxLength(10)
        ]),
        password: [this.data.password, [Validators.required]],
        confirmPassword: [this.data.password, [Validators.required]]
      }, { validators: passwordMatchingValidator });
    } else {
      this.managerForm = this.fb.group({
        firstName: ["", [Validators.required]],
        lastName: ["", [Validators.required]],
        userName: ["", [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
        phone: this.fb.control("", [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(10),
          Validators.maxLength(10)
        ]),
        password: ["", [Validators.required]],
        confirmPassword: ["", [Validators.required]]
      }, { validators: passwordMatchingValidator });
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
    this.saveManagerSubscription = this.flexyService.addUpdateManagerProfile(this.data.id, this.managerForm.value).pipe(
      tap(result => {
        if (result.statusCode) {
          switch (result.statusCode) {
            case 200:
              this.close();
              this.openSnackBar(result.message + "", "x", "success");
              break;

            case 401:
              this.managerStore.update(store => {
                return {
                  ...store,
                  isLoading: false
                };
              });
              this.openSnackBar(result.message + "", "x", "failed");
              break;
          }
        }
      })
    ).subscribe();
  }

  openSnackBar(message, action, status) {
    this._snackBar.open(message, action, {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      panelClass: ["flexy-snackbar", status],
      duration: this.durationInSeconds * 1000
    });
  }

  deleteManager() {
    const title = `מחיקת מדריך`;
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
        this.deleteManagerSubscription = this.flexyService.deleteManager(this.data.id).pipe(
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

  resetForm() {
    this.managerForm.reset();
  }

  ngOnDestroy() {
    this.saveManagerSubscription?.unsubscribe();
    this.deleteManagerSubscription?.unsubscribe();
    this.managerStore.update(store => {
      return {
        ...store,
        isLoading: false
      };
    });
  }
}
