import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { UserInterface } from "../../../../../../libs/shared/user.interface";

interface DialogData extends UserInterface{
  title: string;
  isEdit: boolean;
}

@Component({
  selector: 'app-teacher-dialog',
  templateUrl: './teacher-dialog.component.html',
  styleUrls: ['./teacher-dialog.component.scss']
})
export class TeacherDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialogRef: MatDialog) {}

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.closeAll();
  }

}
