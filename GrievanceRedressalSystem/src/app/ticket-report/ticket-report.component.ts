import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ClientService } from '../services/client.service';


@Component({
  selector: 'app-ticket-report',
  templateUrl: './ticket-report.component.html',
  styleUrls: ['./ticket-report.component.css']
})
export class TicketReportComponent implements OnInit {

  constructor(private clientService : ClientService) {
    this.clientService.getEachCategoryCount()
    .subscribe((res)=> {
      console.log(res);
      this.catArray = res.category;
      this.countArray = res.count;
      console.log(this.catArray);
      console.log(this.countArray);
      this.lineChartData = [{data : this.countArray, label : 'Count'}];
      this.loaded = true;
    });
  }

  ngOnInit(): void {
  }

  catArray : string[];
  countArray : number[];
  loaded : boolean = false;

  public lineChartData : ChartDataSets[];
  public lineChartLabels: Label[] = this.catArray ;
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: ["#897A7A", "#08AD6C", "#C5E32B", "#FF851B", "#7FDBFF", "#B10DC9"],
      //backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'doughnut';
  public lineChartPlugins = [];

 }
