import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css']
})
export class ClientViewComponent implements OnInit {

  username:String;
  count:any;
  isTicketCreated:boolean=false;

  constructor(private clientService : ClientService,private authService : AuthService) {
    this.username = this.authService.give();
    console.log("username is " + this.username);
    console.log("inside constructor");
    this.clientService.getCount()
    .subscribe((res)=>{this.count=res.count+1});
    //console.log(this.count);
  }

  ngOnInit(): void {
  }

  getCount(){
    this.ticket.id=this.count;
  }
  createdat : Date = new Date();
  ticket = {id : this.count , user : this.username ,subject: '' , priority: '', category: '', message: '', status : 'Not Assigned',file:'', createdat:this.createdat};
  errMessTicket = '';

  onCreate(){
    this.ticket.user = this.username;
    console.log('ticket: ',this.ticket);
    console.log("username is " + this.username);
    //console.log("username is " + this.ticket.user);
    this.clientService.createTicket(this.ticket)
    .subscribe(res => {
      if(res.success){
        console.log("Ticket Created");
        this.ticket.id='';
        this.ticket.subject = '';
        this.ticket.priority='';
        this.ticket.category='';
        this.ticket.message='';
        this.isTicketCreated=!this.isTicketCreated;
        this.clientService.notifyAdmin()
        .subscribe(res => { console.log('email sent')});
      }
      else {
        console.log("Unable to create ticket");
      }
    },
    error => {
      console.log("error occured" + error);
      this.errMessTicket = 'Please login to create a ticket';
    });
  }

}
