import { Component, OnInit,ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ClientService } from '../services/client.service';

interface monthcount {
  months : [string],
  count : [number]
}

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  constructor(private clientService : ClientService) {
    this.clientService.getClosedCount().subscribe((res) => this.closedTicketCount = res.count);
    this.clientService.getCount().subscribe((res) => this.totalTicketCount = res.count);
    this.clientService.getAssignedCount().subscribe((res) => this.assignedTicketCount = res.count);
    this.clientService.getTodaysCount().subscribe((res) => this.todaysTicketCount = res.count);
    this.clientService.monthWiseCount()
      .subscribe((res)=> {
                            console.log(typeof res);
                            console.log(Array.from(res.months.values()));
                            console.log(Array.from(res.count.values()));
                            this.countArray = Array.from(res.count.values());
                            this.monthArray = Array.from(res.months.values());
                            console.log(this.monthArray);
                            console.log(this.countArray);
                            //this.lineChartData = [{data : this.countArray,label : 'Total Tickets'}];
                            this.clientService.monthWiseClosedCount()
                              .subscribe((innerres)=>{
                                                      this.closedCountArray = Array.from(innerres.count.values());
                                                      this.closedMonthArray = Array.from(innerres.months.values());
                                                      this.lineChartData = [{data : this.countArray,label : 'Total Tickets'},{data : this.closedCountArray, label : 'Closed Tickets'}];
                                                      this.loaded = true;
                              })

      });
  }

  ngOnInit(): void {
  }

  //variable : monthcount ;
  loaded : boolean = false;
  variable={ months:[], dates:[]}

  totalTicketCount = 0;
  assignedTicketCount = 0;
  closedTicketCount = 0;
  todaysTicketCount = 0;
  countArray : number[];
  monthArray : string[];
  closedCountArray : number[];
  closedMonthArray : string[];

  public lineChartData : ChartDataSets[];


  // public lineChartData: ChartDataSets[] = [
  // { data: [this.countArray[0]], label: 'Series A' },
  // { data: [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0], label: 'Series B' }
  // ];

  // public lineChartData: ChartDataSets[] = [
  // { data: this.variable.count, label: 'Series A' },
  // { data: [100, 59, 80, 90, 56, 55, 42,55,89,72,63,47], label: 'Series B' }
  // ];

  //public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
  public lineChartLabels: Label[] = this.monthArray ;
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

      //[labels]="lineChartLabels"
      //[datasets]="lineChartData"
