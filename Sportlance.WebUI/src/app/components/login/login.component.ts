import { Component, OnInit } from '@angular/core';
import {AuthApiClient} from '../../services/auth-api-client';
import {LoginRequest} from '../../services/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginPage = true;
  public email: string;
  public password: string;

  constructor(private authClient: AuthApiClient) { }

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

  async loginAsync(): Promise<void> {
    await this.authClient.loginAsync(<LoginRequest>{
      email: this.email,
      password: this.password
    });
  }
}
