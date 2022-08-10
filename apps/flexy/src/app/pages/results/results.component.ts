import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Label, SingleDataSet } from "ng2-charts";
import { Router } from "@angular/router";
import { AuthService } from "@flexy/auth";
import { MatDialog } from "@angular/material/dialog";
import { AboutDialogComponent } from "@flexy/ui";

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
  totalVisual = 0;
  totalMovement = 0;
  totalAuditory = 0;

  chartOptions: ChartOptions;
  chartLabels: Label[];
  chartData: SingleDataSet;
  chartType: ChartType = "horizontalBar";
  chartDataSets: ChartDataSets[];
  chartLegend = false;
  chartPlugins = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getResults();
    this.chartOptions = {
      responsive: true,
      legend: {
        display: false,
      },
      layout: {
        padding: {
          right: 20,
          left: 10
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            suggestedMax: 100
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true,
            suggestedMax: 100
          }
        }]
      }
    };

    this.chartData = [this.totalVisual, this.totalMovement, this.totalAuditory];
    this.chartLabels = ["סגנון חזותי", "סגנון תנועתי", "סגנון שמיעתי"];
    this.chartDataSets = [{
      backgroundColor: ["#E9B44C", "#4F5F76", "#DBA88B"]
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
    this.totalVisual = (this.visualLearningPoints * 100) / 50;
    this.totalMovement = (this.movementLearningPoints * 100) / 50;
    this.totalAuditory = (this.auditoryLearningPoints * 100) / 50;
  }

  logout() {
    this.authService.logout();
  }

  openAboutDialog(): void {
    this.dialog.open(AboutDialogComponent);
  }
}
