import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { UserInterface } from "../../../../../libs/shared/user.interface";
import { FlexyService } from "../../../../../libs/shared/flexy.service";
import { StudentsStore } from "../store/students.store";
import { StudentsQuery } from "../store/students.query";
import { AuthService } from "../../../../../libs/auth/auth.service";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, AfterViewInit {

  allStudents$ = this.studentQuery.selectStudents$;

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'phone',
    'school',
    'class',
    'questionaryAnswered',
    'totalVisual',
    'totalMovement',
    'totalAuditory',
    'reset'
  ];
  data: UserInterface[] = [];
  resultsLength = 0;
  isLoading = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private flexyService: FlexyService,
    private studentStore: StudentsStore,
    private studentQuery: StudentsQuery,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.flexyService.getAllStudents().subscribe((students: any) => {
      this.studentStore.update(store => {
        return {
          ...store,
          students: students.Table
        }
      })
      sessionStorage.setItem(`students`, JSON.stringify(students))
    })
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

  logout() {
    this.authService.logout();
  }

}
