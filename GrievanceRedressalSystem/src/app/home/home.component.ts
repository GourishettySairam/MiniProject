import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  count:number;

  constructor(private clientService : ClientService) {
    // this.clientService.getCount()
    // .subscribe((res)=>{this.count=res.count});
  }

  ngOnInit(): void {
  }

  getCount(){
    //console.log(this.count);
  }

}
