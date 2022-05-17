import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@flexy/auth";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {

  constructor(private router: Router, private authService: AuthService) {
  }

  startQuestionary() {
    this.router.navigate([
      'question', 1
    ]);
  }

  logout() {
    this.authService.logout();
  }
}
