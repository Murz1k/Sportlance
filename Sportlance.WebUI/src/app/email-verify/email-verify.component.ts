import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss']
})
export class EmailVerifyComponent implements OnInit {

  public email: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.email = this.authService.getCurrent().email;
  }

  resendEmail() {
    this.authService.reSendEmail(this.authService.accessToken).subscribe();
  }

  changeEmail(): void {
    this.authService.logout();
  }
}
