import {Component, OnInit} from '@angular/core';
import {LoginRequest} from '../auth/requests/login-request';
import {ErrorCode} from '../core/error-code';
import {ActivatedRoute, Router} from '@angular/router';
import {Paths} from '../core/paths';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {isNullOrUndefined} from 'util';
import {AuthService} from '../auth/auth.service';
import {finalize, map, tap} from 'rxjs/operators';

@Component({
  selector: 'sl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoginPage = true;
  public isForgotPasswordPage = false;
  public showPasswordError = false;
  public showLoginError = false;

  public isLoading = false;
  public isDisabled = false;

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(20)]],
      password: ['', Validators.required],
      forgotPasswordEmail: ['', Validators.required],
      rememberMe: [false, [Validators.required]]
    });
  }

  hidePasswordPage(): void {
    this.showLoginError = false;
    this.showPasswordError = false;
    this.isDisabled = false;
    this.form.value.email = '';
    this.isLoginPage = true;
  }

  navigateToRegister(): void {
    this.router.navigate([Paths.SignUp]);
  }

  forgotPassword(): void {
    this.form.controls['forgotPasswordEmail'].setValue(this.form.controls['email'].value);
    this.isForgotPasswordPage = true;
  }

  hideForgotPasswordPage() {
    this.form.controls['forgotPasswordEmail'].reset();
    this.isForgotPasswordPage = false;
  }

  login(): void {
    const form = this.form.value;

    this.isLoading = true;
    this.isDisabled = true;
    this.authService.login(<LoginRequest>{email: form.email, password: form.password}, form.rememberMe)
      .pipe(tap((response) => {
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

      }), finalize(() => {
        this.isDisabled = false;
        this.isLoading = false;
      }))
      .subscribe();
  }

  hideLoginError(): void {
    this.showLoginError = false;
  }

  hidePasswordError(): void {
    this.showPasswordError = false;
  }

  checkKeyDownLogin(e): void {
    if (e.keyCode === 13) {
      this.checkLogin();
    }
  }

  checkKeyDownPassword(e): void {
    if (e.keyCode === 13) {
      this.login();
    }
  }

  checkLogin(): void {

    const form = this.form.value;
    if (isNullOrUndefined(form.email) || form.email === '') {
      form.email = '';
      this.showLoginError = true;
      return;
    }

    this.isDisabled = true;
    this.isLoading = true;
    this.authService.checkUser(form.email)
      .pipe(tap((response) => {
        if (response.error) {
          switch (response.error.code) {
            case ErrorCode.UserNotFound:
              this.showLoginError = true;
              break;
            case ErrorCode.IncorrectValidation:
              this.showLoginError = true;
              break;
          }
          return;
        }
        if (response.email.toUpperCase() === form.email.toUpperCase()) {
          this.isLoginPage = false;
        }
      }), finalize(() => {
        this.isDisabled = false;
        this.isLoading = false;
      }))
      .subscribe();
  }
}
