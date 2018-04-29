import {Component, OnInit} from '@angular/core';
import {AuthApiClient} from '../../services/auth-api-client';
import {LoginRequest} from '../../services/login-request';
import {ErrorCode} from '../../core/error-code';
import {Router} from "@angular/router";
import {Paths} from "../../paths";
import {AccountService} from "../../services/account-service";
import {LoginUser} from "../../services/login-user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isLoginPage = true;
  public showPasswordError = false;
  public showLoginError = false;

  public isDisabled = false;

  public user: LoginUser = <LoginUser>{email: '', password: ''};

  constructor(private router: Router,
              private authClient: AuthApiClient,
              private accountService: AccountService) {
  }

  ngOnInit() {
  }

  hidePasswordPage(): void {
    this.showLoginError = false;
    this.showPasswordError = false;
    this.isDisabled = false;
    this.user.email = '';
    this.isLoginPage = true;
  }

  navigateToRegister(): void {
    this.router.navigate([Paths.SignUp]);
  }

  forgotPassword(): void {

  }

  async loginAsync(): Promise<void> {
    this.isDisabled = true;
    try {
      const response = await this.authClient.loginAsync(<LoginRequest>{
        email: this.user.email,
        password: this.user.password
      });
      this.accountService.login(response);
    }
    catch (e) {
      switch (e.error.errorCode) {
        case ErrorCode.IncorrectPassword:
          this.showPasswordError = true;
        case ErrorCode.IncorrectValidation:
          this.showPasswordError = true;
      }
    }
    this.isDisabled = false;
    await this.router.navigate([Paths.Root]);
  }

  hideLoginError(): void {
    this.showLoginError = false;
  }

  hidePasswordError(): void {
    this.showPasswordError = false;
  }

  ckechKeyDownLogin(e): void {
    if (e.keyCode === 13) {
      this.checkLoginAsync();
    }
  }

  ckechKeyDownPassword(e): void {
    if (e.keyCode === 13) {
      this.loginAsync();
    }
  }

  async checkLoginAsync(): Promise<void> {
    this.isDisabled = true;
    try {
      const response = await this.authClient.checkUserAsync(this.user.email);
      if (response.email.toUpperCase() === this.user.email.toUpperCase()) {
        this.isLoginPage = false;
      }
    }
    catch (e) {
      switch (e.error.errorCode) {
        case ErrorCode.UserNotFound:
          this.showLoginError = true;
        case ErrorCode.IncorrectValidation:
          this.showLoginError = true;
      }
    }
    this.isDisabled = false;
  }
}
