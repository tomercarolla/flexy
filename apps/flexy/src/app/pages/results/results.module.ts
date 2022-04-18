import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import {ResultsComponent} from "./results.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ChartsModule} from "ng2-charts";
import { MatButtonModule } from "@angular/material/button";


@NgModule({
  declarations: [ResultsComponent],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    MatToolbarModule,
    ChartsModule,
    MatButtonModule
  ],
  exports: [ResultsComponent]
})
export class ResultsModule { }
