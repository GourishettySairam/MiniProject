import { Component, OnInit,ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public lineChartData: ChartDataSets[] = [
  { data: [65, 59, 80, 81, 56, 55, 80,55,65,85,50,42], label: 'Series A' },
  { data: [100, 59, 80, 90, 56, 55, 42,55,89,72,63,47], label: 'Series B' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

}