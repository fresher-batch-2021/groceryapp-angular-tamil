import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla', 'Tata'];
  doughnutChartData: MultiDataSet = [
    [25, 25, 25, 25]
  ];
  doughnutChartType: ChartType = 'doughnut';
}
