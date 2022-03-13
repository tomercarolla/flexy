import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from "./teachers.component";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { TeacherDialogComponent } from './teacher-dialog/teacher-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";


@NgModule({
  declarations: [TeachersComponent, TeacherDialogComponent],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [TeachersComponent]
})
export class TeachersModule { }
