import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FlexyService, Student, UserInterface } from "@flexy/shared";
import { MatSort } from "@angular/material/sort";
import { ManagerStore } from "../store/manager.store";
import { ManagerQuery } from "../store/manager.query";
import { MatDialog } from "@angular/material/dialog";
import { StudentDialogComponent } from "./student-dialog/student-dialog.component";
import { MatTableDataSource } from "@angular/material/table";
import { debounceTime, distinctUntilChanged, Observable, Subject, Subscription, tap } from "rxjs";
import * as XLSX from "xlsx";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmationDialogComponent, ConfirmDialogModel } from "@flexy/ui";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "phone",
    "school",
    "year",
    "questionaryAnswered",
    "totalVisual",
    "totalMovement",
    "totalAuditory",
    "reset"
  ];
  userData: UserInterface[] = [];
  resultsLength = 0;
  durationInSeconds = 5;
  downloadExcel: boolean;
  fileName = "תלמידים.xlsx";
  dataSource: MatTableDataSource<Student> = new MatTableDataSource();
  allStudentsSubscription: Subscription | null = null;
  resetQuestionarySubscription: Subscription | null = null;

  isLoading$ = this.managerQuery.selectIsLoading$;
  searchSub$ = new Subject<string>();

  allStudents$: Observable<Student[]> = this.managerQuery.selectStudents$
    .pipe(
      tap((res) => {
        this.downloadExcel = res === undefined;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.cd.detectChanges();
      })
    );

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private flexyService: FlexyService,
    private managerStore: ManagerStore,
    private managerQuery: ManagerQuery,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.refresh();
    this.searchSub$.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe((filterValue: string) => {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    });
  }

  refresh() {
    this.managerStore.update(store => {
      return {
        ...store,
        isLoading: false
      };
    });
    this.allStudentsSubscription = this.flexyService.getAllStudents().pipe(
      tap((students: any) => {
        this.managerStore.update(store => {
          return {
            ...store,
            students: students.Table
          };
        });
        sessionStorage.setItem(`students`, JSON.stringify(students));
        this.managerStore.update(store => {
          return {
            ...store,
            isLoading: false
          };
        });
        this.cd.detectChanges();
      })
    ).subscribe();
  }

  applyFilter(value: string) {
    this.searchSub$.next(value);
  }

  editStudent(student) {
    this.dialog.open(StudentDialogComponent, {
      data: {
        title: "עריכת תלמיד:",
        isEdit: true,
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        phone: student.phone,
        school: student.school,
        year: student.year,
        studentProgress: student.studentProgress,
        totalVisual: student.totalVisual,
        totalMovement: student.totalMovement,
        totalAuditory: student.totalAuditory
      }
    }).afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  addNewStudent() {
    this.dialog.open(StudentDialogComponent, {
      data: { title: "הוספה תלמיד", isEdit: false }
    }).afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById("studentsTable"));
    // const ws = document.getElementById("studentsTable");
    ws["!cols"][9] = { hidden: true };
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Servers");
    // const wb = XLSX.utils.table_to_book(ws, <XLSX.Table2SheetOpts>{
    //   sheet: this.fileName,
    // });
    XLSX.writeFile(wb, this.fileName);
  }

  openSnackBar(message, action, status) {
    this._snackBar.open(message, action, {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      panelClass: ["flexy-snackbar", status],
      duration: this.durationInSeconds * 1000
    });
  }

  resetQuestionary(event, student) {
    event.stopPropagation();
    const title = "איפוס אבחון";
    const message = `האם בטוח לאפס אבחון של: ${student.firstName} ${student.lastName}?`;

    const dialogData = new ConfirmDialogModel(title, message);

    const deleteDialog = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: dialogData
    });

    deleteDialog.afterClosed().subscribe(res => {
      this.managerStore.update(store => {
        return {
          ...store,
          isLoading: true
        };
      });
      if (res) {
        this.resetQuestionarySubscription = this.flexyService.resetQuestinaryPerStudend(student.phone).pipe(
          tap(data => {
            if (data.statusCode) {
              switch (data.statusCode) {
                case 200:
                  this.openSnackBar(data.message + "", "x", "success");
                  this.refresh();
                  break;
                case 401:
                  this.openSnackBar(data.message + "", "x", "failed");
                  break;
                default:
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

  ngOnDestroy() {
    this.allStudentsSubscription?.unsubscribe();
    this.resetQuestionarySubscription?.unsubscribe();
  }
}
