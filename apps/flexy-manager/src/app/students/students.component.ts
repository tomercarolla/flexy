import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Student, UserInterface } from "../../../../../libs/shared/user.interface";
import { MatSort } from "@angular/material/sort";
import { FlexyService } from "../../../../../libs/shared/flexy.service";
import { ManagerStore } from "../store/manager.store";
import { ManagerQuery } from "../store/manager.query";
import { MatDialog } from "@angular/material/dialog";
import { StudentDialogComponent } from "./student-dialog/student-dialog.component";
import { MatTableDataSource } from "@angular/material/table";
import { debounceTime, distinctUntilChanged, Observable, Subject, Subscription, tap } from "rxjs";

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
  isLoading$ = this.managerQuery.selectIsLoading$;
  dataSource: MatTableDataSource<Student> = new MatTableDataSource();
  allStudentsSubscription: Subscription | null = null;

  searchSub$ = new Subject<string>();

  allStudents$: Observable<Student[]> = this.managerQuery.selectStudents$
    .pipe(
      tap((res) => {
        console.log(res)
        const tableData = [];
        res.forEach(item => {
          tableData.push({
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            phone: '0' + item.phone,
            year: item.year,
            questionaryAnswered: item.questionaryAnswered,
            totalVisual: item.totalVisual,
            totalMovement: item.totalMovement,
            totalAuditory: item.totalAuditory,
          })
        })
        this.dataSource = new MatTableDataSource(tableData);
      })
    )

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private flexyService: FlexyService,
    private managerStore: ManagerStore,
    private managerQuery: ManagerQuery,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
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

  ngAfterViewInit() {

  }

  refresh() {
    this.managerStore.update(store => {
      return {
        ...store,
        isLoading: true
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
        studentProgress: student.studentProgress
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

  ngOnDestroy() {
    this.allStudentsSubscription?.unsubscribe();
  }
}
