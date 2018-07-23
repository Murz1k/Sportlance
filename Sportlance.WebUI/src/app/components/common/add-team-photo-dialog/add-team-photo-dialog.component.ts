import {Component, Inject} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditPhotoDialogComponent} from '../edit-photo-dialog/edit-photo-dialog.component';
import {TeamsService} from '../../../services/teams/teams.service';
import {AddTeamPhotoDialogData} from './add-team-photo-dialog-data';

@Component({
  selector: 'app-add-team-photo-dialog',
  templateUrl: './add-team-photo-dialog.component.html',
  styleUrls: ['./add-team-photo-dialog.component.scss']
})
export class AddTeamPhotoDialogComponent {

  private newPhoto: File;
  private teamId: number;
  public url: string;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: AddTeamPhotoDialogData,
              private dialogRef: MatDialogRef<EditPhotoDialogComponent>,
              private teamsService: TeamsService) {
    this.teamId = this.data.teamId;
  }

  onChange(event) {
    this.uploadFile(event);
  }

  private uploadFile(event: any) {
    const reader = new FileReader();
    reader.onload = (e: Event & { target: { result: string } }) => {
      this.url = e.target.result;
    };

    this.newPhoto = event.srcElement.files[0];

    reader.readAsDataURL(this.newPhoto);
  }

  public async submitAsync(): Promise<void> {
    await this.teamsService.addPhotoAsync(this.teamId, this.newPhoto);
    this.dialogRef.close(true);
  }
}