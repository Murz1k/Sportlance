import {Component, OnInit} from '@angular/core';
import {AuthApiClient} from '../services/auth/auth-api-client';
import {LoginRequest} from '../services/auth/requests/login-request';
import {ErrorCode} from '../core/error-code';
import {Router} from '@angular/router';
import {Paths} from '../core/paths';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {isNullOrUndefined} from 'util';
import {UserService} from '../services/user.service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
              private userService: UserService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(20)]],
      password: ['', Validators.required],
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

  login(): void {
    this.isDisabled = true;

    const form = this.loginForm.value;
    this.authClient.login(<LoginRequest>{
      email: form.email,
      password: form.password,
      rememberMe: form.rememberMe
    }).subscribe((response) => {
      if (response.error) {
        switch (response.error.code) {
          case ErrorCode.IncorrectPassword:
            this.showPasswordError = true;
            this.isDisabled = false;
            break;
          case ErrorCode.IncorrectValidation:
            this.showPasswordError = true;
            this.isDisabled = false;
            break;
        }
        return;
      }
      this.userService.saveToken(response.token);
      this.isDisabled = false;
      return this.router.navigate([Paths.Root]);
    });
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
      this.login();
    }
  }

  async checkLoginAsync(): Promise<void> {
    this.isDisabled = true;
    try {
      const form = this.loginForm.value;
      if (isNullOrUndefined(form.email) || form.email === '') {
        form.email = '';
        this.showLoginError = true;
        this.isDisabled = false;
        return;
      }
      const response = await this.authClient.checkUserAsync(form.email);
      if (response.email.toUpperCase() === form.email.toUpperCase()) {
        this.isLoginPage = false;
      }
    } catch (e) {
      switch (e.error.errorCode) {
        case ErrorCode.UserNotFound:
          this.showLoginError = true;
          break;
        case ErrorCode.IncorrectValidation:
          this.showLoginError = true;
          break;
      }
    }
    this.isDisabled = false;
  }
}
