import {ChangeDetectionStrategy, Component} from '@angular/core';
import {QuestionInterface} from "../../shared/question.interface";
import {ReplaySubject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  questions$ = new ReplaySubject<QuestionInterface[]>(1);
  totalQ!: number;
  isRunning = false;

  constructor(private router: Router) {
  }

  startQuestionary() {
    this.router.navigate([
      'question', 1
    ]);
  }
}
