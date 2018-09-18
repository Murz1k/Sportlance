import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../services/user.service/user';
import {AuthApiClient} from '../../../services/auth/auth-api-client';
import {MatDialogRef} from '@angular/material';
import {AccountService} from '../../../services/account-service';
import {UserService} from '../../../services/user.service/user.service';

@Component({
  selector: 'app-edit-trainer-paid-dialog',
  templateUrl: './edit-account-info-dialog.component.html',
  styleUrls: ['./edit-account-info-dialog.component.scss']
})
export class EditAccountInfoDialogComponent implements OnInit {

  public form: FormGroup;
  private account: User;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private authApiClient: AuthApiClient,
              private accountService: AccountService,
              private dialogRef: MatDialogRef<EditAccountInfoDialogComponent>) {
  }

  ngOnInit() {
    this.account = this.userService.getCurrent();
    this.form = this.formBuilder.group({
      firstName: [this.account.firstName],
      secondName: [this.account.secondName],
      email: [this.account.email, Validators.email]
    });
  }

  public async submitAsync(result): Promise<void> {
    if (result) {
      await this.changeAccountInfoAsync();
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
}
