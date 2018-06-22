import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../services/user.service/user';
import {UserInfoStorage} from '../../../core/user-info-storage';
import {AuthApiClient} from '../../../services/auth/auth-api-client';
import {MatDialogRef} from '@angular/material';
import {AccountService} from "../../../services/account-service";

@Component({
  selector: 'app-edit-trainer-paid-dialog',
  templateUrl: './edit-account-info-dialog.component.html',
  styleUrls: ['./edit-account-info-dialog.component.scss']
})
export class EditAccountInfoDialogComponent implements OnInit {

  public form: FormGroup;
  public fee = 20;
  private account: User;

  constructor(private formBuilder: FormBuilder,
              private userContext: UserInfoStorage,
              private authApiClient: AuthApiClient,
              private accountService: AccountService,
              private dialogRef: MatDialogRef<EditAccountInfoDialogComponent>) {
  }

  ngOnInit() {
    this.account = this.userContext.userInfo;
    this.form = this.formBuilder.group({
      firstName: [this.account.firstName],
      secondName: [this.account.secondName],
      email: [this.account.email, Validators.email],
      password: ['', Validators.minLength(6)],
      confirmPassword: ['', Validators.minLength(6)]
    });
  }

  public async submitAsync(result): Promise<void> {
    if (result) {
      await Promise.all([this.changePasswordAsync(), this.changeAccountInfoAsync()]);
      this.dialogRef.close(true);
    }
    this.dialogRef.close(null);
  }

  private async changeAccountInfoAsync() {
    if (this.form.value.firstName !== this.account.firstName
      || this.form.value.secondName !== this.account.secondName
      || this.form.value.email !== this.account.email) {
      const response = await this.authApiClient.updateAccountAsync(this.form.value.firstName, this.form.value.secondName, this.form.value.email);
      this.accountService.login(response);
    }
  }

  private async changePasswordAsync() {
    if (this.form.value.password === this.form.value.confirmPassword && this.form.value.password.length >= 6) {
      await this.authApiClient.updatePasswordAsync(this.form.value.password, this.form.value.confirmPassword);
    }
  }
}
