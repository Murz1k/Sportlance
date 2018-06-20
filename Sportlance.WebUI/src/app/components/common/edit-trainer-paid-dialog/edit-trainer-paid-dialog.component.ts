import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditTrainerPaidDialogData} from './edit-trainer-paid-dialog-data';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-trainer-paid-dialog',
  templateUrl: './edit-trainer-paid-dialog.component.html',
  styleUrls: ['./edit-trainer-paid-dialog.component.scss']
})
export class EditTrainerPaidDialogComponent implements OnInit {

  public form: FormGroup;
  public fee = 20;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: EditTrainerPaidDialogData,
              private dialogRef: MatDialogRef<EditTrainerPaidDialogComponent>) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      paid: [this.data.paid],
    });
  }

  public submit(result): void {
    if (result) {
      this.dialogRef.close(this.form.value.paid);
      return;
    }
    this.dialogRef.close(null);
  }

  public calculateFee(): number {
    return this.form.value.paid / 100 * this.fee;
  }

  public calculatePriceWithoutFee(): number {
    return this.form.value.paid - this.calculateFee();
  }

  public set calculatePaid(paid: number) {
    this.form.value.paid = paid * (1 + (this.fee / 100));
  }
}
