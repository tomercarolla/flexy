import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FlexyService, UserInterface } from "@flexy/shared";
import { ManagerQuery } from "../store/manager.query";
import { MatDialog } from "@angular/material/dialog";
import { ManagerStore } from "../store/manager.store";
import { TeacherDialogComponent } from "./teacher-dialog/teacher-dialog.component";
import { Observable, Subscription, tap } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-teachers",
  templateUrl: "./teachers.component.html",
  styleUrls: ["./teachers.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeachersComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "userName",
    "phone"
  ];
  userData: UserInterface[] = [];
  isLoading$ = this.managerQuery.selectIsLoading$;
  allManagersSubscription: Subscription | null = null;
  dataSource: MatTableDataSource<UserInterface> = new MatTableDataSource();

  allTeachers$: Observable<UserInterface[]> = this.managerQuery.selectTeachers$.pipe(
    tap(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.cd.detectChanges();
    })
  );

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private flexyService: FlexyService,
    private managerQuery: ManagerQuery,
    private managerStore: ManagerStore,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.managerStore.update(store => {
      return {
        ...store,
        isLoading: false
      };
    });
    this.allManagersSubscription = this.flexyService.getAllManagers().pipe(
      tap((managers: any) => {
        this.managerStore.update(store => {
          return {
            ...store,
            managers: managers.Table
          };
        });
        sessionStorage.setItem("managers", JSON.stringify(managers));
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

  addNewTeacher() {
    this.dialog.open(TeacherDialogComponent, {
      data: { title: "הוספה מדריך", isEdit: false }
    }).afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  editTeacher(teacher) {
    this.dialog.open(TeacherDialogComponent, {
      data: {
        title: "עריכת מדריך:",
        isEdit: true,
        id: teacher.id,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        userName: teacher.userName,
        phone: teacher.phone,
        password: teacher.password
      }
    }).afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  ngOnDestroy() {
    this.allManagersSubscription?.unsubscribe();
  }
}
