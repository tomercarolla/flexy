import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionRoutingModule} from './question-routing.module';
import {QuestionComponent} from "./question.component";
import {MatRadioModule} from "@angular/material/radio";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {ProgressBarModule} from "../../../../../../libs/ui/src";
import {MatToolbarModule} from "@angular/material/toolbar";


@NgModule({
  declarations: [QuestionComponent],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatButtonModule,
    ProgressBarModule,
    MatToolbarModule
  ],
  exports: [QuestionComponent]
})
export class QuestionModule {
}
