import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ResultsRoutingModule } from "./results-routing.module";
import { ResultsComponent } from "./results.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ChartsModule } from "ng2-charts";
import { ButtonModule } from "@flexy/ui";


@NgModule({
  declarations: [ResultsComponent],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    MatToolbarModule,
    ChartsModule,
    ButtonModule,
  ],
  exports: [ResultsComponent]
})
export class ResultsModule {
}
