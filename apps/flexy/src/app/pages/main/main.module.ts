import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from "./main.component";
import {QuestionModule} from "../question/question.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [MainComponent],
    imports: [
        CommonModule,
        MainRoutingModule,
        QuestionModule,
        MatToolbarModule,
        HttpClientModule,
        MatButtonModule
    ],
  exports: [MainComponent]
})
export class MainModule { }
