import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../core/auth/auth.service";
import {tap} from "rxjs/operators";
import {Title} from "@angular/platform-browser";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegistrationRequest} from "../core/auth/requests/registration-request";

@Component({
  selector: 'sl-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  userName: string;

  selectedSlide: number = 0;

  public emailAlreadyExist: boolean;

  public showTermsError: boolean;

  public isLoading = false;

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private titleService: Title,
              private router: Router,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.titleService.setTitle(`Sportlance делает жизнь проще - рекомендую`);

    this.userName = this.activatedRoute.snapshot.data['user'].firstName;

    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      isAcceptTerms: [false]
    });
  }

  preview() {
    this.selectedSlide--;
  }

  next() {
    this.selectedSlide++;
  }

  signUp(): void {
    if (!this.form.controls['isAcceptTerms'].value) {
      this.showTermsError = true;
      return;
    }

    if (this.form.invalid) {
      return;
    }
    const form = this.form.value;

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

  public scrollToForm(): void {
    const offsetTop1 = document.getElementById('form').offsetTop;
    window.scrollTo({left: 0, top: offsetTop1 - 40, behavior: 'smooth'});
    return;
  }
}
