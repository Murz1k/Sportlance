import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../core/auth/user';
import {MatDialogRef} from '@angular/material';
import {AuthService} from '../../../core/auth/auth.service';
import {tap} from "rxjs/operators";

@Component({
  selector: 'sl-edit-trainer-paid-dialog',
  templateUrl: './edit-account-info-dialog.component.html',
  styleUrls: ['./edit-account-info-dialog.component.scss']
})
export class EditAccountInfoDialogComponent implements OnInit {

  public form: FormGroup;
  private account: User;
  public isLoading = false;

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
        this.isLoading = true;
        this.authService.updateAccount(this.form.value.firstName, this.form.value.secondName, this.form.value.email)
          .pipe(tap((response) => {
            if (!response.error) {
              this.dialogRef.close(true);
            }
            this.isLoading = false;
          }))
          .subscribe();
      }
    } else {
      this.dialogRef.close(false);
    }
  }
}
