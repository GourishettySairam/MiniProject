import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Ticket } from '../shared/ticket';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-viewticket',
  templateUrl: './viewticket.component.html',
  styleUrls: ['./viewticket.component.css']
})
export class ViewticketComponent implements OnInit {

  username:String;

  constructor(private clientService : ClientService,private authService : AuthService) {
    this.username = this.authService.give();
  }

  tickets : Ticket[];
  errMess : string;

  ngOnInit(): void {
  }

  getTickets(){
    //console.log("inside get tickets");
    this.clientService.getTickets(this.username)
    .subscribe(tickets => {this.tickets = tickets;console.log(this.tickets)},
    errmess => this.errMess = <any>errmess);
  }

  getTicketById(id:any){
    console.log("getting ticket by Id " + id);
  }

}
