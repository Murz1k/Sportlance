import { Component, OnInit } from '@angular/core';
import {AuthApiClient} from "../../services/auth-api-client";
import {UserInfoStorage} from "../../core/user-info-storage";

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss']
})
export class EmailVerifyComponent implements OnInit {

  constructor(private authApiClient: AuthApiClient,
              private userInfoStorage: UserInfoStorage) { }

  ngOnInit() {
  }

  async resendEmailAsync(): Promise<void> {
    const token = this.userInfoStorage.token;
    await this.authApiClient.reSendEmailAsync(token);
  }
}
