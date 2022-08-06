import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { QuestionModule } from "../question/question.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HttpClientModule } from "@angular/common/http";
import { ButtonModule, FooterModule } from "@flexy/ui";
import { MatDialogModule } from "@angular/material/dialog";


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    QuestionModule,
    MatToolbarModule,
    HttpClientModule,
    ButtonModule,
    FooterModule,
    MatDialogModule
  ],
  exports: [MainComponent]
})
export class MainModule {
}
