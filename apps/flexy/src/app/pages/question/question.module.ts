import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuestionRoutingModule } from "./question-routing.module";
import { QuestionComponent } from "./question.component";
import { MatRadioModule } from "@angular/material/radio";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule, ProgressBarModule } from "@flexy/ui";
import { MatToolbarModule } from "@angular/material/toolbar";


@NgModule({
  declarations: [QuestionComponent],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    MatRadioModule,
    ReactiveFormsModule,
    ProgressBarModule,
    ButtonModule,
    MatToolbarModule
  ],
  exports: [QuestionComponent]
})
export class QuestionModule {
}
