import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {




  doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla', 'Tata'];
  doughnutChartData: MultiDataSet = [
    [25, 25, 25, 25]
  ];
  doughnutChartType: ChartType = 'doughnut';
}
