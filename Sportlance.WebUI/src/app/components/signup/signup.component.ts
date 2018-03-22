import {Component, OnInit} from '@angular/core';
import {AuthApiClient} from '../../services/auth-api-client';
import {RegistrationRequest} from '../../services/registration-request';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public isEmailExist: boolean;

  public email: string;
  public password: string;
  public firstName: string;
  public secondName: string;

  constructor(private authClient: AuthApiClient) {
    this.isEmailExist = false;
  }

  checkUserEmail() {
    this.isEmailExist = true;
  }

  ngOnInit() {
  }

  async signupAsync(): Promise<void> {
    await this.authClient.registerAsync(<RegistrationRequest>{
      email: this.email,
      password: this.password
    });
  }
}
