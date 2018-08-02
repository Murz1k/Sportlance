import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDatepicker, MatDialogRef} from '@angular/material';
import {AddTrainerTrainingDialogData} from './add-trainer-training-dialog-data';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TrainersService} from '../../services/trainers/trainers.service';
import {SelectItem} from '../../core/select/select-item';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-trainer-about-dialog',
  templateUrl: './add-trainer-training-dialog.component.html',
  styleUrls: ['./add-trainer-training-dialog.component.scss']
})
export class AddTrainerTrainingDialogComponent implements OnInit {

  public form: FormGroup;
  public trainerSports: SelectItem[] = [];
  @ViewChild('dp') datePicker: MatDatepicker<any>;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: AddTrainerTrainingDialogData,
              private dialogRef: MatDialogRef<AddTrainerTrainingDialogComponent>,
              private trainerService: TrainersService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      sportId: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      hiddenDate: ['', [Validators.required]],
      time: ['', [Validators.required]]
    });
    this.form.controls.hiddenDate.valueChanges.subscribe(() => {
      this.form.controls.startDate.setValue(moment(this.form.controls.hiddenDate.value).format('DD/MM/YYYY'));
    });
    this.datePicker.openedStream.subscribe(() => {
      if (this.form.controls.startDate.value === '') {
        return;
      }
      const date = this.form.controls.startDate.value.split('/').reverse().join('-');
      this.form.controls.hiddenDate.setValue(new Date(date));
    });
    this.trainerSports = this.data.sports.map(i => <SelectItem>{label: i.name, value: i.id});
  }

  private validateForm(): boolean {
    const form = this.form;
    form.controls.sportId.markAsDirty();
    form.controls.startDate.markAsDirty();
    form.controls.time.markAsDirty();
    return form.controls.sportId.valid && form.controls.startDate.valid && form.controls.time.valid;
  }

  public submit() {
    if (!this.validateForm()) {
      this.form.controls.sportId.markAsDirty();
      return;
    }
    this.trainerService.addTraining(this.data.trainerId,
      this.form.value.startDate.split('/').reverse().join('-') + 'T' + this.form.value.time
      , this.form.value.sportId).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
