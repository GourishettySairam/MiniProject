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

interface Count {
  count : number;
}



@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  createTicket(ticket: any):Observable<any> {
    return this.http.post<TicketResponse>(baseURL + 'client/postticket',
    {'id':ticket.id,'firstname':ticket.user,'title':ticket.subject,'priority':ticket.priority,'status':ticket.status,'category':ticket.category,'assignedto':ticket.assignedto,'createdat':ticket.createdat,'message':ticket.message})
    .pipe(map(res=>{
      return { 'success' : true };
    }),
    catchError(error => this.processHTTPMsgService.handleError(error)));
    //console.log("inside the client service");
  }

  notifyAdmin():Observable<any> {
    return this.http.get(baseURL + 'email/send')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getTickets(username:String): Observable<Ticket[]> {
    //console.log("inside client service " + username);
    return this.http.get<Ticket[]>(baseURL + 'client/gettickets/username/' + username)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(baseURL + 'admin/gettickets')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getAssignedTickets(username:String): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(baseURL + 'client/getassignedtickets/' + username)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getCount(): Observable<any> {
    return this.http.get<any>(baseURL + 'client/getCount')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getTicket(id: number): Observable<Ticket> {
      return this.http.get<Ticket>(baseURL + 'client/getTickets/' + id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

  getTicketIds(): Observable<number[] | any> {
      return this.getAllTickets().pipe(map(tickets => tickets.map(ticket => ticket.id)))
        .pipe(catchError(error => error));
    }

  updateTicket(ticket: any):Observable<any> {
    return this.http.put<TicketResponse>(baseURL + 'admin/changeticket/' + ticket.id,
    {'id':ticket.id,'firstname':ticket.firstname,'title':ticket.title,'priority':ticket.priority,'status':ticket.status,'category':ticket.category,'assignedto':ticket.assignedto,'createdat':ticket.createdat,'message':ticket.message,'lastupdatedat':ticket.lastupdatedat,'rating':ticket.rating})
    .pipe(map(res=>{
      return { 'success' : true };
    }),
    catchError(error => this.processHTTPMsgService.handleError(error)));
    //console.log("inside the client service");
  }

}
