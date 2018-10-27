import {Component, OnInit} from '@angular/core';
import {AuthApiClient} from '../services/auth/auth-api-client';
import {UserService} from '../services/user.service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss']
})
export class EmailVerifyComponent implements OnInit {

  public email: string;

  constructor(private authApiClient: AuthApiClient,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.email = this.userService.getCurrent().email;
  }

  async resendEmailAsync(): Promise<void> {
    await this.authApiClient.reSendEmailAsync(this.userService.getToken());
  }

  changeEmail(): void {
    this.userService.deleteCurrentUser();
  }
}
