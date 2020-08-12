import { Component, OnInit } from '@angular/core';
import { Ticket } from '../shared/ticket';
import { ClientService } from '../services/client.service';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  ticket : Ticket;
  ticketIds : number[];
  errMess : string;
  replyMessage: string;

  constructor(private clientService : ClientService,private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.clientService.getTicketIds().subscribe(ticketIds => this.ticketIds = ticketIds);
      this.route.params.pipe(switchMap((params: Params) => {return this.clientService.getTicket(params['id']);}))
      .subscribe(ticket => { this.ticket = ticket;},
        errmess => this.errMess = <any>errmess);
  }

  reply(){
    console.log('reply updating');
    this.ticket.message = this.replyMessage;
    this.ticket.lastupdatedat = new Date();
    this.clientService.updateTicket(this.ticket)
    .subscribe(res => {
        if(res.success){
          this.replyMessage = "";
          console.log("Ticket Updated");
        }
        else {
          console.log("Unable to update ticket");
        }
      },
      error => {
        console.log("error occured" + error);
      });
  }

}
