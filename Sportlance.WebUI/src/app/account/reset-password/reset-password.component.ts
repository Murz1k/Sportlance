import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../../core/auth/auth.service";
import {LoginResponse} from "../../core/auth/responses/login-response";
import {finalize, tap} from "rxjs/operators";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'sl-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public form: FormGroup;

  public isLoading = false;
  public isDisabled = false;

  constructor(private titleService: Title,
              private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.titleService.setTitle(`Сброс пароля | Sportlance`);

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['accessToken'] && params['refreshToken']) {
        this.authService.saveTokens(<LoginResponse>{
          accessToken: params['accessToken'],
          refreshToken: params['refreshToken']
        });
        this.router.navigate([], {
          queryParams: {
            accessToken: null,
            refreshToken: null,
          },
          queryParamsHandling: 'merge'
        })
      }
    });
    this.form = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      remember: [false, [Validators.required]]
    });
  }

  submit() {
    this.isLoading = true;
    this.isDisabled = true;
    this.authService.updatePassword(
      undefined,
      this.form.controls['newPassword'].value,
      this.form.controls['confirmPassword'].value
    )
      .pipe(tap((response) => {
        if (!response.error) {
          this.authService.saveTokens(response);
          this.router.navigate(['']);
        }
      }), finalize(() => {
        this.isDisabled = false;
        this.isLoading = false;
      })).subscribe();
  }
}
