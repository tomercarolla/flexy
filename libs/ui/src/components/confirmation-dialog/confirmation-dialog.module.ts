import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";
import { MatIconModule } from "@angular/material/icon";
import { ButtonModule } from "../button/button.module";


@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    ButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [
    ConfirmationDialogComponent
  ]
})
export class ConfirmationDialogModule {
}
