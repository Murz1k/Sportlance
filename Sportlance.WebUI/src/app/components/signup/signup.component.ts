import {Component, OnInit} from '@angular/core';
import {AuthApiClient} from '../../services/auth-api-client';
import {RegistrationRequest} from '../../services/registration-request';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorCode} from "../../core/error-code";
import {Paths} from "../../paths";
import {Router} from "@angular/router";
import {LoginRequest} from "../../services/login-request";
import {AccountService} from "../../services/account-service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public isEmailExist: boolean;
  public emailAlreadyExist: boolean;

  public beTrainer: boolean;
  public needTrainer: boolean;

  public submitForm: FormGroup;
  public showChooseRoleError: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private accountService: AccountService,
              private authClient: AuthApiClient) {
    this.isEmailExist = false;
    this.createForm();
  }

  public changeBe(): void {
    this.beTrainer = !this.beTrainer;
    this.showChooseRoleError = false;
  }

  public changeNeed(): void {
    this.needTrainer = !this.needTrainer;
    this.showChooseRoleError = false;
  }

  async checkUserEmailAsync(): Promise<void> {
    if (!this.validateLogin()) {
      return;
    }
    try {
      const response = await this.authClient.checkUserAsync(this.submitForm.value.email);
      if (response.email.toUpperCase() === this.submitForm.value.email.toUpperCase()) {
        this.emailAlreadyExist = true;
      }
    } catch (e) {
      switch (e.error.errorCode) {
        case ErrorCode.UserNotFound:
          this.isEmailExist = true;
          break;
        case ErrorCode.EmailIsNotConfirmed:
          this.emailAlreadyExist = true;
          break;
      }
    }
  }

  private validateLogin(): boolean {
    const form = this.submitForm;
    form.controls.firstName.markAsDirty();
    form.controls.lastName.markAsDirty();
    form.controls.email.markAsDirty();
    return form.controls.firstName.valid && form.controls.lastName.valid && form.controls.email.valid;
  }

  ngOnInit() {
  }

  private createForm() {
    this.submitForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async signupAsync(): Promise<void> {
    if (this.submitForm.invalid) {
      return;
    }
    if (!this.beTrainer && !this.needTrainer) {
      this.showChooseRoleError = true;
      return;
    }
    const form = this.submitForm.value;
    await this.authClient.registerAsync(<RegistrationRequest>{
      email: form.email,
      lastName: form.lastName,
      password: form.password,
      firstName: form.firstName,
      beTrainer: this.beTrainer,
      needTrainer: this.needTrainer
    });

    const response = await this.authClient.loginAsync(<LoginRequest>{
      email: form.email,
      password: form.password
    });
    this.accountService.login(response);

    this.router.navigate([Paths.EmailVerify]);
  }
}
