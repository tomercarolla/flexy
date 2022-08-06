import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainRoutingModule } from "./main-routing.module";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MainComponent } from "./main.component";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { ButtonModule, FooterModule } from "@flexy/ui";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatIconModule,
    ButtonModule,
    FooterModule
  ],
  exports: [MainComponent]
})
export class MainModule { }
