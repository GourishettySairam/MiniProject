import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn: Boolean = false;
  haveAccount : Boolean = true;
  isSignupSuccessful : Boolean = false;
  signupCompleted : Boolean = false;
  otp : string ;
  showOtpBox : Boolean = false;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log(this.isLoggedIn);
  }

  ngOnInit(): void {
    console.log(this.isLoggedIn);
  }

  user = {username: '', password: '', firstname:'', email:'', name:'' };
  name = {firstname:'',lastname:''}
  errMessLogin: string;
  errMessSignup: string;

  onSubmit() {
    console.log('User: ', this.user);
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res.success) {
          console.log("success");
          this.isLoggedIn = true;
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
          this.isSignupSuccessful = true;
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

  negateHaveAccount()
  {
    this.haveAccount = !this.haveAccount;
  }

  checkOtp(){
    this.authService.checkOtp(this.otp, this.user.email)
    .subscribe((res)=>{
      console.log("otp successfully verified");
      this.signupCompleted = !this.signupCompleted;
      this.isSignupSuccessful = !this.isSignupSuccessful;
      this.haveAccount = !this.haveAccount;
    },
    error => {
      console.log(error);
      this.errMessSignup = error;
    });
  }
  //
  // sendOtp(){
  //   this.showOtpBox = !this.showOtpBox;
  //   this.authService.sendOtp()
  //   .subscribe((res)=>console.log("otp sent succesfully"));
  // }
  //

}
