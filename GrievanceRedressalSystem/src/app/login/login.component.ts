import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  user = {username: '', password: '', remember: false};
  name = {firstname:'',lastname:''}
  errMessLogin: string;
  errMessSignup: string;

  onSubmit() {
    console.log('User: ', this.user);
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res.success) {
          //document.location.href='admindashboard',true;
          //location.go('/home');
          console.log("success");
        } else {
          console.log(res);
        }
      },
      error => {
        console.log(error);
        this.errMessLogin = 'Invalid Credentials, Please try again :(';
      });
  }

  signup(){
    console.log('User: ', this.user);
    this.authService.signUp(this.user)
      .subscribe(res => {
        if (res.success) {
          console.log("success");
        } else {
          console.log(res);
        }
      },
      error => {
        console.log(error);
        this.errMessSignup = error;
      });
  }

  logout(){
    console.log("logging out");
    this.authService.logOut();
  }

}
