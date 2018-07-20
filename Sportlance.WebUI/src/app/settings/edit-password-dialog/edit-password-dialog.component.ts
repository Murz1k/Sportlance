import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthApiClient} from '../../services/auth/auth-api-client';
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
      password: ['', Validators.minLength(6)],
      confirmPassword: ['', Validators.minLength(6)]
    });
  }

  public async submitAsync(result): Promise<void> {
    if (result) {
      await this.changePasswordAsync();
      this.dialogRef.close(true);
    }
    this.dialogRef.close(null);
  }

  private async changePasswordAsync() {
    if (this.form.value.password === this.form.value.confirmPassword
      && this.form.value.password.length >= 6
      && this.form.value.password !== this.form.value.oldPassword) {
      await this.authApiClient.updatePasswordAsync(this.form.value.oldPassword, this.form.value.password, this.form.value.confirmPassword);
    }
  }
}
