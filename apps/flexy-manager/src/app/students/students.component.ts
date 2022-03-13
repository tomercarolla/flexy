import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { Student, UserInterface } from "../../../../../libs/shared/user.interface";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FlexyService } from "../../../../../libs/shared/flexy.service";
import { ManagerStore } from "../store/manager.store";
import { ManagerQuery } from "../store/manager.query";
import { AuthService } from "../../../../../libs/auth/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { StudentDialogComponent } from "./student-dialog/student-dialog.component";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsComponent implements OnInit {

  allStudents$ = this.managerQuery.selectStudents$;

  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "phone",
    "school",
    "class",
    "questionaryAnswered",
    "totalVisual",
    "totalMovement",
    "totalAuditory",
    "reset"
  ];
  userData: UserInterface[] = [];
  resultsLength = 0;
  isLoading = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private flexyService: FlexyService,
    private managerStore: ManagerStore,
    private managerQuery: ManagerQuery,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.flexyService.getAllStudents().subscribe((students: any) => {
      this.managerStore.update(store => {
        return {
          ...store,
          students: students.Table
        };
      });
      sessionStorage.setItem(`students`, JSON.stringify(students));
    });
  }

  ngAfterViewInit() {
    this.isLoading = false;
    // const studentsData = this.flexyService.getAllStudents().subscribe((students: any) => {
    //   this.studentStore.update(store => {
    //     return {
    //       ...store,
    //       students: students.Table
    //     }
    //   })
    //   sessionStorage.setItem(`students`, JSON.stringify(students))
    // })

    // If the user changes the sort order, reset back to the first page.
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(
    //     startWith({}),
    //     switchMap(() => {
    //       this.isLoading = true;
    //       return
    //     })
    //   )
  }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editStudent(student) {
    this.dialog.open(StudentDialogComponent, {
      data: {
        title: "עריכת תלמיד:",
        isEdit: true,
        firstName: student.firstName,
        lastName: student.lastName,
        phone: student.phone,
        school: student.school,
        class: student.class
      }
    });
    console.log(student);
  }

  addNewStudent() {
    this.dialog.open(StudentDialogComponent, {
      data: { title: "הוספה תלמיד", isEdit: false }
    });
  }
}
