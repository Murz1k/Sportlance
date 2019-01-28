import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TeamsService} from "../../../teams.service";
import {TeamServiceResponse} from "../../../../shared/teams/responses/team-service-response";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {tap} from "rxjs/operators";

@Component({
  selector: 'sl-edit-service-dialog',
  templateUrl: './edit-service-dialog.component.html',
  styleUrls: ['./edit-service-dialog.component.scss']
})
export class EditServiceDialogComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: TeamServiceResponse,
              private dialogRef: MatDialogRef<EditServiceDialogComponent>,
              private teamsService: TeamsService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      price: [0, [Validators.required]]
    });
  }

  public submit() {
    this.teamsService.addService(50018, this.form.value)
      .pipe(tap((response) => {
        if (!response.error) {
          this.dialogRef.close(response);
        }
      }))
      .subscribe();
  }
}
