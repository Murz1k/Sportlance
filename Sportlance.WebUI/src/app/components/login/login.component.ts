import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginPage = true;

  constructor() { }

  ngOnInit() {
  }

  showPasswordPage(){
    this.isLoginPage = false;
  }
  hidePasswordPage(){
    this.isLoginPage = true;
  }
  forgotPassword(){

  }
}
