import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditPhotoDialogComponent} from '../../../../account/edit-photo-dialog/edit-photo-dialog.component';
import {TeamsService} from '../../../teams.service';
import {AddTeamPhotoDialogData} from './add-team-photo-dialog-data';
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'sl-add-team-photo-dialog',
  templateUrl: './add-team-photo-dialog.component.html',
  styleUrls: ['./add-team-photo-dialog.component.scss']
})
export class AddTeamPhotoDialogComponent {

  private newPhoto: File;
  private teamId: number;
  public url: string;

  public isLoading: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: AddTeamPhotoDialogData,
              private dialogRef: MatDialogRef<EditPhotoDialogComponent>,
              private teamsService: TeamsService) {
    this.teamId = this.data.teamId;
  }

  onChange(event) {
    this.uploadFile(event);
  }

  private uploadFile(event: any) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent & { target: { result: string } }) => {
      this.url = e.target.result;
    };

    this.newPhoto = event.srcElement.files[0];

    reader.readAsDataURL(this.newPhoto);
  }

  public submit() {
    this.isLoading = true;
    this.teamsService.addPhoto(this.teamId, this.newPhoto)
      .pipe(
        tap((response) => {
          if (!response.error) {
            this.dialogRef.close(response);
          }
          this.isLoading = false;
        }),
        catchError((error) => {
          this.isLoading = false;
          return throwError(error);
        })
      )
      .subscribe();
  }
}
