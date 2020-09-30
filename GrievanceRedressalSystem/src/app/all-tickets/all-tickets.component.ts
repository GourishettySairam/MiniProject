import { Component, OnInit } from '@angular/core';
import { Ticket } from '../shared/ticket';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.css']
})
export class AllTicketsComponent implements OnInit {

  constructor(private clientService : ClientService) { }

  ngOnInit(): void {
  }

  tickets : Ticket[];
  errMess : string;
  errMessage : string;

  getAllTickets(){
    this.clientService.getAllTickets()
    .subscribe(tickets => {this.tickets = tickets;console.log(this.tickets);this.errMessage = ''},
    errmess => {this.errMessage='Only Admins can see all tickets'});
  }

  getTicketById(id:any){
    console.log("getting ticket by Id " + id);
  }

}
