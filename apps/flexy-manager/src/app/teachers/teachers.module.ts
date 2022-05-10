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
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ButtonModule } from "@flexy/ui";


@NgModule({
  declarations: [TeachersComponent, TeacherDialogComponent],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSortModule,
    MatTooltipModule,
    ButtonModule
  ],
  exports: [TeachersComponent]
})
export class TeachersModule { }
