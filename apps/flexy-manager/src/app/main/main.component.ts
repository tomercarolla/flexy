import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { AuthService } from "@flexy/auth";
import { MatDialog } from "@angular/material/dialog";
import { AboutDialogComponent } from "@flexy/ui";

@Component({
  selector: "app-students",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  hideMenu = true;

  links = [
    { path: "/main/students", icon: "person", title: "תלמידים" },
    { path: "/main/teachers", icon: "badge", title: "מדריכים" }
  ];

  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.isAdmin();
  }

  isAdmin(): void {
    if (this.authService.getRole() === "admin") {
        this.hideMenu = false;
    }
  }

  logout(): void {
    this.authService.logout();
  }

  openAboutDialog(): void {
    this.dialog.open(AboutDialogComponent, {
      width: '650px'
    });
  }
}
