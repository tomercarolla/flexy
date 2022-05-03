import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StudentsRoutingModule } from "./students-routing.module";
import { StudentsComponent } from "./students.component";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { StudentDialogComponent } from "./student-dialog/student-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTooltipModule } from "@angular/material/tooltip";
import { HighchartsChartModule } from "highcharts-angular";
import { ButtonModule } from "@flexy/ui";

@NgModule({
  declarations: [StudentsComponent, StudentDialogComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatExpansionModule,
    MatTooltipModule,
    HighchartsChartModule,
    ButtonModule
  ],
  exports: [StudentsComponent]
})
export class StudentsModule { }
