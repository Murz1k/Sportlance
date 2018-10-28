import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditTrainerPaidDialogData} from './edit-trainer-paid-dialog-data';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TrainersService} from "../../trainers/trainers.service";

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
              private dialogRef: MatDialogRef<EditTrainerPaidDialogComponent>,
              private trainerService: TrainersService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      paid: [this.data.paid],
    });
  }

  public async submitAsync(result: boolean): Promise<void> {
    if (result && this.data.paid !== this.form.value.paid) {
      await this.trainerService.updatePaidAsync(this.form.value.paid);
      this.dialogRef.close(true);
      return;
    }
    this.dialogRef.close(false);
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
