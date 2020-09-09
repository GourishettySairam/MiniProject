import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

interface AuthResponse {
  status: string;
  success: string;
  token: string;
}

interface JWTResponse {
  status: string;
  success: string;
  user: any;
}

interface Response {
  status : string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenKey = 'JWT';
  isAuthenticated: Boolean = false;
  username: Subject<string> = new Subject<string>();
  authToken: string = undefined;
  user : string = '';

   constructor(private http: HttpClient,
     private processHTTPMsgService: ProcessHTTPMsgService) {
   }

   checkJWTtoken() {
     this.http.get<JWTResponse>(baseURL + 'users/checkJWTtoken')
     .subscribe(res => {
       console.log('JWT Token Valid: ', res);
       this.sendUsername(res.user.username);
       this.user=res.user.username;
       console.log('after logging in' +this.user);
     },
     err => {
       console.log('JWT Token invalid: ', err);
       this.destroyUserCredentials();
     });
   }

   sendUsername(name: string) {
     this.username.next(name);
   }

   clearUsername() {
     this.username.next(undefined);
   }

   loadUserCredentials() {
     const credentials = JSON.parse(localStorage.getItem(this.tokenKey));
     console.log('loadUserCredentials ', credentials);
     if (credentials && credentials.username !== undefined) {
       this.useCredentials(credentials);
       if (this.authToken) {
        this.checkJWTtoken();
       }
     }
   }

   storeUserCredentials(credentials: any) {
     console.log('storeUserCredentials ', credentials);
     localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
     this.useCredentials(credentials);
   }

   useCredentials(credentials: any) {
     this.isAuthenticated = true;
     this.sendUsername(credentials.username);
     this.authToken = credentials.token;
   }

   destroyUserCredentials() {
     this.authToken = undefined;
     this.clearUsername();
     this.isAuthenticated = false;
     localStorage.removeItem(this.tokenKey);
   }

   signUp(user: any):Observable<any> {
      return this.http.post<AuthResponse>(baseURL + 'users/signup',
      {'username': user.username, 'password':user.password, 'firstname':user.name, 'email': user.email })
      .pipe(map(res=>{
        this.storeUserCredentials({username: user.username, token: res.token});
        return {'success': true, 'username': user.username };
      }),
      catchError(error => this.processHTTPMsgService.handleError(error)));
   }

   logIn(user: any): Observable<any> {
     return this.http.post<AuthResponse>(baseURL + 'users/login',
       {'username': user.username, 'password': user.password})
       .pipe( map(res => {
           this.storeUserCredentials({username: user.username, token: res.token});
           this.user=user.username;
           //console.log('after logging in' +this.user);
           return {'success': true, 'username': user.username };
       }),
        catchError(error => this.processHTTPMsgService.handleError(error)));
   }

   logOut() {
     this.destroyUserCredentials();
     console.log("authtoken is " + this.authToken);
   }

   isLoggedIn(): Boolean {
     return this.isAuthenticated;
   }

   getUsername(): Observable<string> {
     return this.username.asObservable();
   }

   give(): String {
    return this.user;
   }


   getToken(): string {
     return this.authToken;
   }

   checkOtp(otp:string, email:string): Observable<any> {
     return this.http.post<Response>(baseURL + 'users/checkotp',
     { 'token': otp, 'email': email})
     .pipe(map(res => {
       return { 'success' : true };
     }),
     catchError(error => this.processHTTPMsgService.handleError(error)));
   }
}
