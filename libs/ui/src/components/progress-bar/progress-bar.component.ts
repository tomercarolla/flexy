import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'flexy-progress-bar',
  template: `
    <div class="progress-bar-container">
      <div class="progress-bar {{color}}"
           [ngStyle]="{'width': progress + '%'}">
      </div>
    </div>
  `,
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent implements OnInit {

  @Input() progress!: number;
  @Input() total!: number;
  color!: string;

  ngOnInit(): void {
    this.initProgress();
    this.initColors(this.progress);
  }

  initProgress() {
    if (!this.progress) {
      this.progress = 0;
    }
    if (this.total === 0) {
      this.total = this.progress;
    } else if (!this.total) {
      this.total = 30;
    }
    // if (this.progress > this.total) {
    //   this.progress = 100;
    //   this.total = 30;
    // }
  }

  initColors(progress: number) {
    if (progress < 55) {
      this.color = 'red';
    } else if (progress < 75) {
      this.color = 'yellow';
    } else {
      this.color = 'green';
    }
  }

}
