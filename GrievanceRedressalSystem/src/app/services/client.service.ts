import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Ticket } from '../shared/ticket';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

interface TicketResponse {
  success : string;
}



@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  createTicket(ticket: any):Observable<any> {
    return this.http.post<TicketResponse>(baseURL + 'client/postticket',
    {'id':ticket.id,'firstname':ticket.user,'title':ticket.subject,'priority':ticket.priority,'status':ticket.status,'category':ticket.category,'assignedto':ticket.assignedto})
    .pipe(map(res=>{
      return { 'success' : true };
    }),
    catchError(error => this.processHTTPMsgService.handleError(error)));
    console.log("inside the client service");
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(baseURL + 'client/gettickets')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
