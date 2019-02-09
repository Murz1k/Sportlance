import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import {Component, OnInit, Inject} from '@angular/core';
import {AuthService} from '../core/auth/auth.service';
import {finalize, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'sl-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss']
})
export class EmailVerifyComponent implements OnInit {

  private secondsKey = 'resendEmailCooldown';
  public email: string;
  public seconds: number;
  public lastTime: string;

  public isLoading = false;
  public isDisabled = false;

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private titleService: Title,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.titleService.setTitle(`Подтверждение регистрации | Sportlance`);

    if (!this.authService.isAuthorized) {
      this.router.navigate(['']);
      return;
    }
    this.email = this.authService.getCurrent().email;

    const cooldown = this.localStorage.getItem(this.secondsKey);
    if (cooldown != undefined) {
      this.seconds = +cooldown;
    }
    setInterval(() => this.updateSeconds(), 1000);
  }

  private updateSeconds() {
    if (this.seconds > 0) {
      this.seconds--;
      this.lastTime = new Date(null, null, null, null, null, this.seconds).toTimeString()
        .match(/\d{2}:\d{2}:\d{2}/)[0].slice(3);
      this.localStorage.setItem(this.secondsKey, this.seconds.toString());
    }
  }

  resendEmail() {
    this.isLoading = true;
    this.isDisabled = true;
    this.authService.reSendEmail(this.authService.accessToken)
      .pipe(tap((response: any) => {
        if (!response || !response.error) {
          this.seconds = 300;
          this.localStorage.setItem(this.secondsKey, this.seconds.toString());
        }
      }), finalize(() => {
        this.isDisabled = false;
        this.isLoading = false;
      }))
      .subscribe();
  }

  changeEmail(): void {
    this.router.navigate(['login']);
  }
}
