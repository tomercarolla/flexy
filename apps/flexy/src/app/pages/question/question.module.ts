import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { QuestionRoutingModule } from "./question-routing.module";
import { QuestionComponent } from "./question.component";
import { MatRadioModule } from "@angular/material/radio";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule, ProgressBarModule } from "@flexy/ui";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";


@NgModule({
  declarations: [QuestionComponent],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    MatRadioModule,
    ReactiveFormsModule,
    ProgressBarModule,
    ButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  providers: [DatePipe],
  exports: [QuestionComponent]
})
export class QuestionModule {
}
