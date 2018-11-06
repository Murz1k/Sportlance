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

  async resendEmailAsync(): Promise<void> {
    await this.authService.reSendEmailAsync(this.authService.accessToken);
  }

  changeEmail(): void {
    this.authService.logout();
  }
}
