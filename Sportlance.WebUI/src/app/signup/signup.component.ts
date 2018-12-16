import {Component, OnInit} from '@angular/core';
import {RegistrationRequest} from '../auth/requests/registration-request';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorCode} from '../core/error-code';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'sl-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public isEmailExist: boolean;
  public emailAlreadyExist: boolean;

  public submitForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.isEmailExist = false;

    this.submitForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  checkUserEmail(): void {
    if (!this.validateLogin()) {
      return;
    }

    this.authService.checkUser(this.submitForm.value.email)
      .subscribe((response) => {
        if (response.error) {
          if (response.error.code === ErrorCode.UserNotFound) {
            this.isEmailExist = true;
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
    if (this.submitForm.invalid) {
      return;
    }
    const form = this.submitForm.value;
    this.authService.register(<RegistrationRequest>{
      email: form.email,
      lastName: form.lastName,
      password: form.password,
      firstName: form.firstName
    }).subscribe();
  }
}
