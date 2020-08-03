import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

interface TicketCreated {
  status : string;
  success : string;
}

@Injectable({
  providedIn: 'root'
})
export class CreateticketService {

  constructor() { }

  createTicket(ticket: any):Observable<any> {
    return this.http.post<TicketCreated>(baseURL + 'client/createtoken',
    {'id':ticket.id,'firstname':ticket.username,'title':ticket.subject,'priority':ticket.priority,'status':ticket.status,'category':ticket.category,'assignedto':ticket.assignedto})
  };

}
