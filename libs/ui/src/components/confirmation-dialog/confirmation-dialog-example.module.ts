import {CommonModule} from '@angular/common';
import {Component, Input, NgModule} from '@angular/core';
import {ButtonModule, ConfirmationDialogComponent} from "@flexy/ui";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: `confirmation-dialog-example`,
  template: `
    <button flexyButton color="primary" (click)="openDialog()">Open Dialog</button>
  `,
})
export class ConfirmationDialogExampleComponent {
  @Input() public title: string;
  @Input() public message: string;

  constructor(
    private dialog: MatDialog,
  ) {
  }

  openDialog(): void {
    console.log('here')
    this.dialog.open(ConfirmationDialogComponent, {
      data: { title: this.title, message: this.message }
    }).afterClosed().subscribe(() => {
      console.log('closed');
    });
  }
}

@NgModule({
  declarations: [ConfirmationDialogExampleComponent],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [ConfirmationDialogExampleComponent],
})
export class ConfirmationDialogExampleModule {}
