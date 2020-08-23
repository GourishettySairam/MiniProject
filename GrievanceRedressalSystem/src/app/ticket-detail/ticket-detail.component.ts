import { Component, OnInit } from '@angular/core';
import { Ticket } from '../shared/ticket';
import { ClientService } from '../services/client.service';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Member } from '../shared/member';
@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  ticket : Ticket;
  members : Member[];
  ticketIds : number[];
  errMess : string;
  replyMessage: string='';
  cellMembers : {};
  emailMember : Member;
  assignedto : String = '';

  constructor(private clientService : ClientService,private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.clientService.getTicketIds().subscribe(ticketIds => this.ticketIds = ticketIds);
      this.route.params.pipe(switchMap((params: Params) => {return this.clientService.getTicket(params['id']);}))
      .subscribe(ticket => { this.ticket = ticket;this.assignedto = ticket.assignedto},
        errmess => this.errMess = <any>errmess);

    this.clientService.getMembers()
    .subscribe(members => {this.members = members;console.log(this.members)},
    errmess => {this.errMess = <any>errmess;});
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
          if(this.assignedto === '')
          {
            console.log("inside if block");
            this.clientService.getMemberByName(this.ticket.assignedto)
            .subscribe((res) => {
              this.emailMember = res;
              console.log(this.emailMember);
              console.log(this.emailMember[0].email);

              this.clientService.notifyMember(this.emailMember[0].email)
              .subscribe((res) => {
                console.log("successfully notified");
              },
              error => {
                console.log("error occured in notifyMember" + error);
              });
            },
            error => {
              console.log("error occured in getmemberby name " + error);
            });
          }
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
