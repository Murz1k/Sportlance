import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditTrainerAboutDialogData} from './edit-trainer-about-dialog-data';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TrainersService} from '../../services/trainers/trainers.service';

@Component({
  selector: 'app-edit-trainer-about-dialog',
  templateUrl: './edit-trainer-about-dialog.component.html',
  styleUrls: ['./edit-trainer-about-dialog.component.scss']
})
export class EditTrainerAboutDialogComponent implements OnInit {

  public form: FormGroup;
  private maxLength = 500;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: EditTrainerAboutDialogData,
              private dialogRef: MatDialogRef<EditTrainerAboutDialogComponent>,
              private trainerService: TrainersService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      about: [this.data.about, [Validators.maxLength(this.maxLength)]],
    });
  }

  public async submitAsync(result: boolean): Promise<void> {
    if (result && this.data.about !== this.form.value.about) {
      await this.trainerService.updateAboutAsync(this.form.value.about);
      this.dialogRef.close(true);
      return;
    }
    this.dialogRef.close(false);
  }

  getCharactersLeft(): number {
    return this.maxLength - this.form.value.about.length;
  }
}
