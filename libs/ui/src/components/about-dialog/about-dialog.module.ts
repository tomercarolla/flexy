import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutDialogComponent } from "./about-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";



@NgModule({
  declarations: [AboutDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [AboutDialogComponent]
})
export class AboutDialogModule { }
