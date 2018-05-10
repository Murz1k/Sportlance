import {Component, OnInit} from '@angular/core';
import {AuthApiClient} from '../../services/auth-api-client';
import {LoginRequest} from '../../services/login-request';
import {ErrorCode} from '../../core/error-code';
import {Router} from '@angular/router';
import {Paths} from '../../paths';
import {AccountService} from '../../services/account-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authClient: AuthApiClient,
              private accountService: AccountService) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.email]],
      rememberMe: [false, [Validators.required]]
    });
  }

  hidePasswordPage(): void {
    this.showLoginError = false;
    this.showPasswordError = false;
    this.isDisabled = false;
    this.loginForm.value.email = '';
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
      const form = this.loginForm.value;
      const response = await this.authClient.loginAsync(<LoginRequest>{
        email: form.email,
        password: form.password,
        rememberMe: form.rememberMe
      });
      this.accountService.login(response);
      this.isDisabled = false;
      await this.router.navigate([Paths.Root]);
    } catch (e) {
      switch (e.error.errorCode) {
        case ErrorCode.IncorrectPassword:
          this.showPasswordError = true;
          this.isDisabled = false;
        case ErrorCode.IncorrectValidation:
          this.showPasswordError = true;
          this.isDisabled = false;
      }
    }
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
      const form = this.loginForm.value;
      const response = await this.authClient.checkUserAsync(form.email);
      if (response.email.toUpperCase() === form.email.toUpperCase()) {
        this.isLoginPage = false;
      }
    } catch (e) {
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
