import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditPhotoDialogData} from './edit-photo-dialog-data';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/auth/auth.service';
import {finalize, map} from 'rxjs/operators';

@Component({
  selector: 'sl-edit-photo-dialog',
  templateUrl: './edit-photo-dialog.component.html',
  styleUrls: ['./edit-photo-dialog.component.scss']
})
export class EditPhotoDialogComponent implements OnInit {

  public form: FormGroup;
  private maxLength = 500;
  private newPhoto: File;
  isLoading = false;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: EditPhotoDialogData,
              private dialogRef: MatDialogRef<EditPhotoDialogComponent>,
              private authService: AuthService) {
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
    reader.onload = (e: ProgressEvent & { target: { result: string } }) => {
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

  public submit(): void {
    this.isLoading = true;
    this.authService.uploadPhoto(this.newPhoto).pipe(map((response) => {
      if (!response.error) {
        this.authService.saveTokens(response, true);
        this.dialogRef.close(true);
      }
    }), finalize(() => {
      this.isLoading = false;
    })).subscribe();
  }
}
