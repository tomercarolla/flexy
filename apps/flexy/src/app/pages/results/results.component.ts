import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Label, SingleDataSet } from "ng2-charts";
import { Router } from "@angular/router";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent implements OnInit {

  visualLearningPoints = 0;
  movementLearningPoints = 0;
  auditoryLearningPoints = 0;

  chartOptions: ChartOptions;
  chartLabels: Label[];
  chartData: SingleDataSet;
  chartType: ChartType = "doughnut";
  chartDataSets: ChartDataSets[];
  chartLegend = false;
  chartPlugins = [];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.getResults();
    this.chartOptions = {
      responsive: true
    };

    this.chartData = [this.visualLearningPoints, this.movementLearningPoints, this.auditoryLearningPoints];
    this.chartLabels = ["סגנון ויזואלי", "סגנון תנועתי", "סגנון שמיעתי"];
    this.chartDataSets = [{
      backgroundColor: ["#E9B44C", "#4F5F76", "#FFDABF"]
    }];
  }

  getResults() {
    const storage = JSON.parse(sessionStorage.getItem("questions"));
    if (!storage?.length) {
      this.router.navigate(["main"]);
    }
    storage.forEach(question => {
      switch (question.learningType) {
        case "visual":
          return this.visualLearningPoints += question.answer;
        case "movement":
          return this.movementLearningPoints += question.answer;
        case "auditory":
          return this.auditoryLearningPoints += question.answer;
      }
    });
  }
}
