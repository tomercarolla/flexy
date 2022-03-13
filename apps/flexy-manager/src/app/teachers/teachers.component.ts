import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { UserInterface } from "../../../../../libs/shared/user.interface";
import { ManagerQuery } from "../store/manager.query";
import { StudentDialogComponent } from "../students/student-dialog/student-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { FlexyService } from "../../../../../libs/shared/flexy.service";
import { ManagerStore } from "../store/manager.store";
import { TeacherDialogComponent } from "./teacher-dialog/teacher-dialog.component";

@Component({
  selector: "app-teachers",
  templateUrl: "./teachers.component.html",
  styleUrls: ["./teachers.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeachersComponent implements OnInit {

  allTeachers$ = this.managerQuery.selectTeachers$;

  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "userName",
    "password"
  ];
  userData: UserInterface[] = [];
  isLoading = false;

  constructor(
    private flexyService: FlexyService,
    private managerQuery: ManagerQuery,
    private managerStore: ManagerStore,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.flexyService.getAllManagers().subscribe( (managers: any) => {
      this.managerStore.update(store => {
        return  {
          ...store,
          managers: managers.Table
        }
      })
      sessionStorage.setItem('managers', JSON.stringify(managers))
    })
  }

  addNewTeacher() {
    this.dialog.open(TeacherDialogComponent, {
      data: { title: "הוספה מדריך", isEdit: false }
    });
  }

  editTeacher(teacher) {
    this.dialog.open(TeacherDialogComponent, {
      data: {
        title: "עריכת מדריך:",
        isEdit: true,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        password: teacher.password
      }
    });
    console.log(teacher);
  }
}
