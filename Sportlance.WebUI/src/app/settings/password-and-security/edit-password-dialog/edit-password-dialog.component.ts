import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthApiClient} from '../../../services/auth/auth-api-client';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-edit-password-dialog',
  templateUrl: './edit-password-dialog.component.html',
  styleUrls: ['./edit-password-dialog.component.scss']
})
export class EditPasswordDialogComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authApiClient: AuthApiClient,
              private dialogRef: MatDialogRef<EditPasswordDialogComponent>) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      oldPassword: ['', Validators.minLength(6)],
      newPassword: ['', Validators.minLength(6)],
      confirmPassword: ['', Validators.minLength(6)]
    });
  }

  public submit(result): void {
    if (result) {
      this.changePassword();
      return;
    }
    this.dialogRef.close(false);
  }

  private changePassword() {
    if (this.form.value.newPassword === this.form.value.confirmPassword
      && this.form.controls['newPassword'].valid
      && this.form.value.newPassword !== this.form.value.oldPassword) {
      this.authApiClient.updatePassword(
        this.form.value.oldPassword,
        this.form.value.newPassword,
        this.form.value.confirmPassword
      ).subscribe((response) => {
        if (!response.error) {
          this.dialogRef.close(true);
        }
      });
    }
  }
}
