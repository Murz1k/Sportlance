import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditPhotoDialogData} from './edit-photo-dialog-data';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TrainersService} from "../../services/trainers/trainers.service";

@Component({
  selector: 'edit-photo-dialog',
  templateUrl: './edit-photo-dialog.component.html',
  styleUrls: ['./edit-photo-dialog.component.scss']
})
export class EditPhotoDialogComponent implements OnInit {

  public form: FormGroup;
  private maxLength = 500;
  private newPhoto: File;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: EditPhotoDialogData,
              private dialogRef: MatDialogRef<EditPhotoDialogComponent>,
              private trainerService: TrainersService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      url: [this.data.url, [Validators.maxLength(this.maxLength)]],
    });
  }

  onChange(event) {
    this.uploadFile(event);
  }

  private uploadFile(event: any) {
    //const acceptedFormats = this.accept.split(', ');

    const reader = new FileReader();
    reader.onload = (e: Event & { target: { result: string } }) => {
      this.form.value.url = e.target.result;
      //this.inputElement.nativeElement.value = null;
    };

    this.newPhoto = event.srcElement.files[0];
    //this.value = event.srcElement.files[0];

    // if (this.maxFileSize < this.value.size) {
    //   this.deleteFile();
    //   this.onMaxSizeError.emit();
    //   return;
    // }
    //
    // this.fileName = event.srcElement.files[0].name;
    //
    // if (!acceptedFormats.includes(event.target.files[0].type)) {
    //   this.deleteFile();
    //   this.onMimeTypeError.emit();
    //   return;
    // }
    //
    reader.readAsDataURL(this.newPhoto);
    // this.uploadHandler.emit(this.value);
  }

  public async submitAsync(): Promise<void> {
    await this.trainerService.uploadPhotoAsync(this.newPhoto);
    this.dialogRef.close(true);
  }
}
