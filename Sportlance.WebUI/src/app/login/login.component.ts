import {Component, OnInit} from '@angular/core';
import {LoginRequest} from '../services/auth/requests/login-request';
import {ErrorCode} from '../core/error-code';
import {ActivatedRoute, Router} from '@angular/router';
import {Paths} from '../core/paths';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {isNullOrUndefined} from 'util';
import {AuthService} from '../services/auth/auth.service';
import {map} from 'rxjs/operators';

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

  }

  login(): void {
    this.isDisabled = true;

    const form = this.form.value;
    this.authService.login(<LoginRequest>{email: form.email, password: form.password}, form.rememberMe)
      .pipe(map((response) => {
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
            // case ErrorCode.EmailIsNotConfirmed:
            //   this.router.navigate([Paths.ConfirmRegistration]);
            //   break;
          }
          return;
        }

        this.isDisabled = false;
      }))
      .subscribe();
  }

  hideLoginError(): void {
    this.showLoginError = false;
  }

  hidePasswordError(): void {
    this.showPasswordError = false;
  }

  ckechKeyDownLogin(e): void {
    if (e.keyCode === 13) {
      this.checkLogin();
    }
  }

  ckechKeyDownPassword(e): void {
    if (e.keyCode === 13) {
      this.login();
    }
  }

  checkLogin(): Promise<void> {
    this.isDisabled = true;

    const form = this.form.value;
    if (isNullOrUndefined(form.email) || form.email === '') {
      form.email = '';
      this.showLoginError = true;
      this.isDisabled = false;
      return;
    }
    this.authService.checkUser(form.email)
      .subscribe((response) => {
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
        this.isDisabled = false;
      });
  }
}
