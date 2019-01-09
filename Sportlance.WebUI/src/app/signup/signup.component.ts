import {Component, OnInit} from '@angular/core';
import {RegistrationRequest} from '../core/auth/requests/registration-request';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorCode} from '../core/error-code';
import {Router} from '@angular/router';
import {AuthService} from '../core/auth/auth.service';
import {tap} from "rxjs/operators";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'sl-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public showPasswordPage: boolean;
  public emailAlreadyExist: boolean;

  public showTermsError: boolean;

  public isLoading = false;

  public submitForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private titleService: Title,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.titleService.setTitle(`Регистрация в Sportlance`);

    this.submitForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      isAcceptTerms: [false]
    });

    this.submitForm.controls['email'].valueChanges.subscribe(() => {
      this.emailAlreadyExist = false;
    });

    this.submitForm.controls['isAcceptTerms'].valueChanges.subscribe(() => {
      this.showTermsError = false;
    });
  }

  checkUserEmail(): void {
    if (!this.validateLogin()) {
      return;
    }

    this.isLoading = true;

    this.authService.checkUser(this.submitForm.value.email)
      .subscribe((response) => {
        this.isLoading = false;
        if (response.error) {
          if (response.error.code === ErrorCode.UserNotFound) {
            this.showPasswordPage = true;
            return;
          }
          if (response.error.code === ErrorCode.EmailIsNotConfirmed) {
            this.emailAlreadyExist = true;
            return;
          }
        }
        if (response.email.toUpperCase() === this.submitForm.value.email.toUpperCase()) {
          this.emailAlreadyExist = true;
        }
      });
  }

  private validateLogin(): boolean {
    const form = this.submitForm;
    form.controls.firstName.markAsDirty();
    form.controls.lastName.markAsDirty();
    form.controls.email.markAsDirty();
    return form.controls.firstName.valid && form.controls.lastName.valid && form.controls.email.valid;
  }

  signUp(): void {
    if (!this.submitForm.controls['isAcceptTerms'].value) {
      this.showTermsError = true;
      return;
    }

    if (this.submitForm.invalid) {
      return;
    }
    const form = this.submitForm.value;

    this.isLoading = true;

    this.authService.register(<RegistrationRequest>{
      email: form.email,
      lastName: form.lastName,
      password: form.password,
      firstName: form.firstName
    }).pipe(tap((response) => {
      if (!response.error) {
        this.authService.saveTokens(response);
        this.router.navigate(['email-verify']);
      } else {
        this.isLoading = false;
      }
    })).subscribe();
  }
}
