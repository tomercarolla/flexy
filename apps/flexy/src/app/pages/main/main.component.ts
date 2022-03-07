import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {

  constructor(private router: Router) {
  }

  startQuestionary() {
    this.router.navigate([
      'question', 1
    ]);
  }
}
