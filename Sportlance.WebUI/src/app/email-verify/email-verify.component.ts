import {Component, OnInit} from '@angular/core';
import {AuthApiClient} from '../services/auth/auth-api-client';
import {UserInfoStorage} from '../core/user-info-storage';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss']
})
export class EmailVerifyComponent implements OnInit {

  public email: string;

  constructor(private authApiClient: AuthApiClient,
              private userInfoStorage: UserInfoStorage) {
  }

  ngOnInit() {
    this.email = this.userInfoStorage.getCurrentUser().email;
  }

  async resendEmailAsync(): Promise<void> {
    const token = this.userInfoStorage.getCurrentUser().token;
    await this.authApiClient.reSendEmailAsync(token);
  }
}
