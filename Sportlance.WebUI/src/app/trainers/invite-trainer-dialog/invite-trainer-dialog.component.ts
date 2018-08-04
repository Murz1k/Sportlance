import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GetTeamQuery} from '../../services/teams/requests/get-team-query';
import {TeamsService} from '../../services/teams/teams.service';
import {InviteTrainerDialogData} from './invite-trainer-dialog-data';
import {SelectItem} from '../../core/select/select-item';

@Component({
  selector: 'app-edit-trainer-about-dialog',
  templateUrl: './invite-trainer-dialog.component.html',
  styleUrls: ['./invite-trainer-dialog.component.scss']
})
export class InviteTrainerDialogComponent implements OnInit {

  public form: FormGroup;
  public teams: SelectItem[] = [];

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: InviteTrainerDialogData,
              private dialogRef: MatDialogRef<InviteTrainerDialogComponent>,
              private teamService: TeamsService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: '',
      message: '',
      teamId: ''
    });
    this.teamService.getSelf(<GetTeamQuery>{
      count: 10,
      offset: 0
    }).subscribe((response) => {
      this.teams = response.items.map(item => <SelectItem>{label: item.title, value: item.id});
    });
  }

  public submit(result: boolean) {
    if (result) {
      this.teamService.inviteMember(this.form.controls['teamId'].value, this.data.trainerId)
        .subscribe(() => {
          this.dialogRef.close(true);
        });
    } else {
      this.dialogRef.close(false);
    }
  }
}
