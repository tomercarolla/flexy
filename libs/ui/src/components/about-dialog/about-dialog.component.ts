import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.scss']
})
export class AboutDialogComponent {

  constructor(private dialogRef: MatDialog) { }

  close(): void {
    this.dialogRef.closeAll();
  }

}
