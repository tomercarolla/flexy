import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Student } from "../../../../../../libs/shared/user.interface";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

interface DialogData extends Student {
  title: string;
  isEdit: boolean;
}

@Component({
  selector: "app-student-dialog",
  templateUrl: "./student-dialog.component.html",
  styleUrls: ["./student-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentDialogComponent implements OnInit {

  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialogRef: MatDialog, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: this.fb.control(this.data.firstName, [Validators.required]),
      lastName: this.fb.control(this.data.lastName, [Validators.required]),
      phone: this.fb.control(this.data.phone, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      school: this.fb.control(this.data.school, [Validators.required]),
      class: this.fb.control(this.data.class, [Validators.required]),
      progress: this.fb.control(this.data.progress)
    });
  }

  close() {
    this.dialogRef.closeAll();
  }

  save(student: Student) {
    console.log(student)
  }

  resetForm() {
    this.form.reset();
  }

  deleteStudent(student: Student) {
    console.log(student);
  }
}
