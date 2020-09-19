import { Component, OnInit } from '@angular/core';
import { Ticket } from '../shared/ticket';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-rated-tickets',
  templateUrl: './rated-tickets.component.html',
  styleUrls: ['./rated-tickets.component.css']
})
export class RatedTicketsComponent implements OnInit {

  constructor(private clientService : ClientService) {
  }

  ngOnInit(): void {
  }

  tickets : Ticket[];
  errMess : string;
  errMessage : string;

  getAllTickets(){
    this.clientService.getRatedTickets()
    .subscribe(tickets => {this.tickets = tickets;console.log(this.tickets)},
    errmess => {this.errMess = <any>errmess;;this.errMessage='Only admins can see all the tickets'});
  }

}
