import {Component, OnInit} from '@angular/core';
import {AuthApiClient} from '../services/auth/auth-api-client';
import {LoginRequest} from '../services/auth/requests/login-request';
import {ErrorCode} from '../core/error-code';
import {ActivatedRoute, Params, Router} from '@angular/router';
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

  public redirectUrl = '';

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authClient: AuthApiClient,
              private userService: UserService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(20)]],
      password: ['', Validators.required],
      rememberMe: [false, [Validators.required]]
    });
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.redirectUrl = params['redirectUrl'];
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

  async login(): Promise<void> {
    this.isDisabled = true;

    const form = this.loginForm.value;
    const response = await this.authClient.login(<LoginRequest>{
      email: form.email,
      password: form.password,
      rememberMe: form.rememberMe
    }).toPromise();

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
    this.userService.saveToken(response.token);

    const user = this.userService.getCurrent();
    if (!user.isConfirmed) {
      this.router.navigate([Paths.EmailVerify]);
      return;
    }

    this.isDisabled = false;
    this.router.navigate([`${Paths.Root}${this.redirectUrl}`]);
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

    const form = this.loginForm.value;
    if (isNullOrUndefined(form.email) || form.email === '') {
      form.email = '';
      this.showLoginError = true;
      this.isDisabled = false;
      return;
    }
    this.authClient.checkUser(form.email)
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
      });

    this.isDisabled = false;
  }
}
