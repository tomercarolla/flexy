import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { QuestionRoutingModule } from "./question-routing.module";
import { QuestionComponent } from "./question.component";
import { MatRadioModule } from "@angular/material/radio";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule, FooterModule, ProgressBarModule } from "@flexy/ui";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSnackBarModule } from "@angular/material/snack-bar";


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
    FooterModule
  ],
  providers: [DatePipe],
  exports: [QuestionComponent]
})
export class QuestionModule {
}
