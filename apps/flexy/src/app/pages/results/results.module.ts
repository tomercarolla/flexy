import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ResultsRoutingModule } from "./results-routing.module";
import { ResultsComponent } from "./results.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ChartsModule } from "ng2-charts";
import { ButtonModule, FooterModule } from "@flexy/ui";


@NgModule({
  declarations: [ResultsComponent],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    MatToolbarModule,
    ChartsModule,
    ButtonModule,
    FooterModule
  ],
  exports: [ResultsComponent]
})
export class ResultsModule {
}
