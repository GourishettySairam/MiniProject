import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Ticket } from '../shared/ticket';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-your-tickets',
  templateUrl: './your-tickets.component.html',
  styleUrls: ['./your-tickets.component.css']
})
export class YourTicketsComponent implements OnInit {

  constructor(private clientService : ClientService,private authService : AuthService) { }

  username:String;

  ngOnInit(): void {
    this.username = this.authService.give();
  }

  tickets : Ticket[];
  errMess : string;

  getAssignedTickets(){
    //console.log("inside get tickets");
    this.clientService.getAssignedTickets(this.username)
    .subscribe(tickets => {this.tickets = tickets;console.log(this.tickets)},
    errmess => this.errMess = <any>errmess);
  }

}
