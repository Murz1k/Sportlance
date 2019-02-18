import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeamsService} from "../../teams.service";
import {finalize, tap} from "rxjs/operators";
import {TeamResponse} from "../../../shared/teams/requests/team-response";

@Component({
  selector: 'sl-edit-team-about-dialog',
  templateUrl: './edit-team-about-dialog.component.html',
  styleUrls: ['./edit-team-about-dialog.component.scss']
})
export class EditTeamAboutDialogComponent implements OnInit {

  public form: FormGroup;
  private maxLength = 500;
  isLoading = false;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: TeamResponse,
              private dialogRef: MatDialogRef<EditTeamAboutDialogComponent>,
              private teamsService: TeamsService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      about: [this.data.about, [Validators.maxLength(this.maxLength)]],
    });
  }

  public submit(result: boolean){
    if (result && this.data.about !== this.form.value.about) {
      this.isLoading = true;
      this.teamsService.updateAbout(this.data.id, this.form.value.about)
        .pipe(tap((response) => {
          if (!response.error) {
            this.dialogRef.close(response);
          }
        }), finalize(() => {
          this.isLoading = false;
        })).subscribe();
    } else {
      this.dialogRef.close(false);
    }
  }

  getCharactersLeft(): number {
    return this.maxLength - this.form.value.about.length;
  }
}
