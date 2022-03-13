import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "../../../../../libs/auth/auth.service";

@Component({
  selector: 'app-students',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {

  links = [
    {path: '/main/students', icon: 'person', title: 'תלמידים' },
    {path: '/main/teachers', icon: 'badge', title: 'מדריכים'}
  ];

  constructor(
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
  }

}
