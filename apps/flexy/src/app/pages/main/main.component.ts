import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@flexy/auth";
import { AboutDialogComponent } from "@flexy/ui";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {

  constructor(private router: Router, private authService: AuthService, private dialog: MatDialog) {
  }

  startQuestionary() {
    this.router.navigate([
      'question', 1
    ]);
  }

  openAboutDialog(): void {
    this.dialog.open(AboutDialogComponent, {
      width: '650px',
      data: {
        title: 'אודות',
        isAbout: true,
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
