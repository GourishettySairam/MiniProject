import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css']
})
export class ClientViewComponent implements OnInit {

  constructor(private clientService : ClientService,private authService : AuthService) {

  }




  username:string;

  ngOnInit(): void {
    this.authService.getUsername().subscribe(user => this.username = user);
    //console.log("username is " + username);
  }

  ticket = {id : 11 , user : this.username ,subject: '' , priority: '', category: '', message: '', status : 'Not Assigned',file:''};
  errMessTicket = '';

  onCreate(){
    //this.ticket.user = this.username;
    console.log('ticket: ',this.ticket);
    console.log("username is " + this.ticket.user);
    this.clientService.createTicket(this.ticket)
    .subscribe(res => {
      if(res.success){
        console.log("Ticket Created");
      }
      else {
        console.log("Unable to create ticket");
      }
    },
    error => {
      console.log("error occured" + error);
      this.errMessTicket = error;
    });
  }

}
