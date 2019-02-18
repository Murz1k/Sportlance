import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditPhotoDialogComponent} from '../../../../account/edit-photo-dialog/edit-photo-dialog.component';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {TrainersService} from '../../../trainers.service';

@Component({
  selector: 'sl-add-skills-dialog',
  templateUrl: './add-skills-dialog.component.html',
  styleUrls: ['./add-skills-dialog.component.scss']
})
export class AddSkillsDialogComponent {

  public isLoading: boolean;

  inputString: string;

  constructor(@Inject(MAT_DIALOG_DATA) public skills: any[],
              private dialogRef: MatDialogRef<EditPhotoDialogComponent>,
              private trainersService: TrainersService) {
  }

  public submit() {
    this.dialogRef.close(this.skills);

    // this.isLoading = true;
    // this.trainersService.updateSkills(this.skills)
    //   .pipe(
    //     tap((response) => {
    //       if (!response.error) {
    //         this.dialogRef.close(response);
    //       }
    //       this.isLoading = false;
    //     }),
    //     catchError((error) => {
    //       this.isLoading = false;
    //       return throwError(error);
    //     })
    //   )
    //   .subscribe();
  }

  deleteSkill(skill: any) {
    this.skills = this.skills.filter(i => i !== skill);
  }

  onKeyEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.skills.push(this.inputString);
      this.inputString = undefined;
    }
  }
}
