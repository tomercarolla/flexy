import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { AuthService } from "../../../../../libs/auth/auth.service";

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
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.isAdmin();
  }

  isAdmin() {
    if (this.authService.getRole() === "admin") {
        this.hideMenu = false;
    }
  }

  logout() {
    this.authService.logout();
  }

}
