import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label, SingleDataSet} from 'ng2-charts';
import {Router} from "@angular/router";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent implements OnInit {

  visualLearningPoints = 0;
  movementLearningPoints = 0;
  auditoryLearningPoints = 0;

  pieChartOptions: ChartOptions;
  pieChartLabels: Label[];
  pieChartData: SingleDataSet;
  pieChartType: ChartType = 'pie';
  // colors: Color[] = [
  //   {
  //     backgroundColor: [
  //       'red',
  //       'green',
  //       'blue'
  //     ]
  //   }
  // ]
  pieChartLegend = false;
  pieChartPlugins = [];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.getResults();
    this.pieChartOptions = {
      responsive: true
    };
    this.pieChartData = [this.visualLearningPoints, this.movementLearningPoints, this.auditoryLearningPoints];
    this.pieChartLabels = ['סגנון ויזואלי', 'סגנון תנועתי', 'סגנון שמיעתי'];
  }

  getResults() {
    const storage = JSON.parse(sessionStorage.getItem('questions'));
    if (!storage?.length) {
      this.router.navigate(['main']);
    }
    storage.forEach(question => {
      switch (question.learningType) {
        case 'visual':
          return this.visualLearningPoints += question.answer;
        case 'movement':
          return this.movementLearningPoints += question.answer;
        case 'auditory':
          return this.auditoryLearningPoints += question.answer;
      }
    })
  }
}
