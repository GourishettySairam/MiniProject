import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Ticket } from '../shared/ticket';
import { Member } from '../shared/member';
import { Category } from '../shared/category';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { User } from '../shared/user';

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

  notifyMember(mail:String):Observable<any> {
    return this.http.post(baseURL + 'email/notifymember/' + mail, {'email':mail} )
    .pipe(map(res=>{
      return { 'success' : true };
    }),
    catchError(error => this.processHTTPMsgService.handleError(error)));
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

  getClosedCount(): Observable<any> {
    return this.http.get<any>(baseURL + 'admin/getclosedcount')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getAssignedCount(): Observable<any> {
    return this.http.get<any>(baseURL + 'admin/getassignedcount')
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

  addmember(member : any):Observable<any> {
    return this.http.post<TicketResponse>(baseURL + 'admin/addmembers',
    { 'name':member.name, 'email':member.email, 'department': member.department })
    .pipe(map(res => {
      return { 'success' : true };
    }),
    catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(baseURL + 'admin/getMembers')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(baseURL + 'admin/getusers')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getMemberByName(name : string ) : Observable<Member> {
    return this.http.get<Member>(baseURL + 'admin/getmemberbyname/' + name )
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(baseURL + 'admin/getcategories')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  addCategories(category: any): Observable<any> {
    return this.http.post<any>(baseURL + 'admin/addcategory', { 'categoryname' : category.categoryname,'head': category.head })
    .pipe(map(res=>{
      return { 'success' : true };
    }),
    catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  addClient(user : any):Observable<any> {
    console.log("inside client service");
    return this.http.post<TicketResponse>(baseURL + 'admin/addnewuser',
    { 'firstname':user.firstname, 'lastname':user.lastname, 'username': user.username, 'password':user.password })
    .pipe(map(res => {
      return { 'success' : true };
    }),
    catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  deleteMember(id : string):Observable<any> {
    return this.http.delete<TicketResponse>(baseURL + 'admin/deletemember/' + id)
    .pipe(map(res => {
      return { 'success' : true };
    }),
    catchError(error => this.processHTTPMsgService.handleError(error)));
  }


}
