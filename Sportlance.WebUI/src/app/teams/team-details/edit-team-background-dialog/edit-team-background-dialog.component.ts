import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditTeamBackgroundDialogData} from './edit-team-background-dialog-data';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeamsService} from "../../teams.service";
import {finalize, tap} from "rxjs/operators";
import {TeamServiceResponse} from "../../../shared/teams/responses/team-service-response";

@Component({
  selector: 'edit-team-background-dialog',
  templateUrl: './edit-team-background-dialog.component.html',
  styleUrls: ['./edit-team-background-dialog.component.scss']
})
export class EditTeamBackgroundDialogComponent implements OnInit {

  public form: FormGroup;
  private maxLength = 500;
  private newPhoto: File;
  isLoading = false;
  team: TeamServiceResponse;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: EditTeamBackgroundDialogData,
              private dialogRef: MatDialogRef<EditTeamBackgroundDialogComponent>,
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
    this.teamService.uploadBackgroundImage(this.team.id, this.newPhoto)
      .pipe(tap((response) => {
        if (!response.error) {
          this.dialogRef.close(response);
        }
      }), finalize(() => {
        this.isLoading = false;
      })).subscribe();
  }
}
