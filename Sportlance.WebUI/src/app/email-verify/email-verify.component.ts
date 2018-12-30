import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

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

  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
    if (!this.authService.isAuthorized) {
      this.router.navigate(['']);
      return;
    }
    this.email = this.authService.getCurrent().email;

    const cooldown = localStorage.getItem(this.secondsKey);
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
      localStorage.setItem(this.secondsKey, this.seconds.toString());
    }
  }

  resendEmail() {
    this.authService.reSendEmail(this.authService.accessToken)
      .pipe(tap((response: any) => {
        if (!response || !response.error) {
          this.seconds = 300;
          localStorage.setItem(this.secondsKey, this.seconds.toString());
        }
      }))
      .subscribe();
  }

  changeEmail(): void {
    this.authService.logout();
  }
}
