import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TeamsService} from "../../../teams.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'sl-edit-service-dialog',
  templateUrl: './edit-service-dialog.component.html',
  styleUrls: ['./edit-service-dialog.component.scss']
})
export class EditServiceDialogComponent implements OnInit {

  form: FormGroup;

  public isLoading: boolean;

  private teamId: number;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<EditServiceDialogComponent>,
              private teamsService: TeamsService) {
  }

  ngOnInit() {
    this.teamId = this.data.teamId;

    this.form = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      price: [0, [Validators.required]]
    });

    this.form.controls['id'].setValue(this.data.id);
    this.form.controls['name'].setValue(this.data.name);
    this.form.controls['description'].setValue(this.data.description);
    this.form.controls['duration'].setValue(this.data.duration);
    this.form.controls['price'].setValue(this.data.price);
  }

  public deleteService() {
    this.isLoading = true;
    if (this.form.controls['id'].value) {
      this.teamsService.deleteService(this.teamId, this.form.controls['id'].value)
        .pipe(
          tap((response) => {
            if (!response) {
              const result = {id: this.form.controls['id'].value, isDeleted: true};
              this.dialogRef.close(true);
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

  public submit() {
    this.isLoading = true;
    if (this.form.controls['id'].value) {
      this.teamsService.updateService(this.teamId, this.form.controls['id'].value, this.form.value)
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
    } else {
      this.teamsService.addService(this.teamId, this.form.value)
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
}
