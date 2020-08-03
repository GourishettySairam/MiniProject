import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Ticket } from '../shared/ticket';

@Component({
  selector: 'app-viewticket',
  templateUrl: './viewticket.component.html',
  styleUrls: ['./viewticket.component.css']
})
export class ViewticketComponent implements OnInit {

  constructor(private clientService : ClientService) { }

  tickets : Ticket[];
  errMess : string;

  ngOnInit(): void {
  }

  getTickets(){
    console.log("inside get tickets");
    this.clientService.getTickets()
    .subscribe(tickets => {this.tickets = tickets;console.log(this.tickets)},
    errmess => this.errMess = <any>errmess);
  }

}
