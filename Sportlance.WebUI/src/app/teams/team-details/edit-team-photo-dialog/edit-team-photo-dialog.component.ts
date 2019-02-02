import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditTeamPhotoDialogData} from './edit-team-photo-dialog-data';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {finalize, tap} from 'rxjs/operators';
import {TeamsService} from "../../teams.service";
import {TeamServiceResponse} from "../../../shared/teams/responses/team-service-response";

@Component({
  selector: 'sl-edit-team-photo-dialog',
  templateUrl: './edit-team-photo-dialog.component.html',
  styleUrls: ['./edit-team-photo-dialog.component.scss']
})
export class EditTeamPhotoDialogComponent implements OnInit {

  public form: FormGroup;
  private maxLength = 500;
  private newPhoto: File;
  isLoading = false;
  team: TeamServiceResponse;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: EditTeamPhotoDialogData,
              private dialogRef: MatDialogRef<EditTeamPhotoDialogComponent>,
              private teamService: TeamsService) {
  }

  ngOnInit() {
    this.team = this.data.team;
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
    this.teamService.uploadMainPhoto(this.team.id, this.newPhoto)
      .pipe(tap((response) => {
      if (!response.error) {
        this.dialogRef.close(response);
      }
    }), finalize(() => {
      this.isLoading = false;
    })).subscribe();
  }
}
