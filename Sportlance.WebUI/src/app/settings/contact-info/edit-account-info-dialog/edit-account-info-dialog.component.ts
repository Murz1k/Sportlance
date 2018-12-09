import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../services/user.service/user';
import {MatDialogRef} from '@angular/material';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-edit-trainer-paid-dialog',
  templateUrl: './edit-account-info-dialog.component.html',
  styleUrls: ['./edit-account-info-dialog.component.scss']
})
export class EditAccountInfoDialogComponent implements OnInit {

  public form: FormGroup;
  private account: User;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private dialogRef: MatDialogRef<EditAccountInfoDialogComponent>) {
  }

  ngOnInit() {
    this.account = this.authService.getCurrent();
    this.form = this.formBuilder.group({
      firstName: [this.account.firstName],
      secondName: [this.account.secondName],
      email: [this.account.email, Validators.email]
    });
  }

  public submit(result) {
    if (result) {
      if (this.form.value.firstName !== this.account.firstName
        || this.form.value.secondName !== this.account.secondName
        || this.form.value.email !== this.account.email) {
        this.authService.updateAccount(this.form.value.firstName, this.form.value.secondName, this.form.value.email)
          .subscribe(() => this.dialogRef.close(true));
      }
    } else {
      this.dialogRef.close(false);
    }
  }
}
