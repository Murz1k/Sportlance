import {Component, OnInit} from '@angular/core';
import {TrainersService} from '../../trainers.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'sl-trainer-work-experience-edit',
  templateUrl: './trainer-work-experience-edit.component.html',
  styleUrls: ['./trainer-work-experience-edit.component.scss']
})
export class TrainerWorkExperienceEditComponent implements OnInit {

  public form: FormGroup;
  trainerId: number;

  isSaving = false;

  constructor(private formBuilder: FormBuilder, private trainersService: TrainersService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.trainerId = +this.route.snapshot.paramMap.get('id');

    this.form = this.formBuilder.group({
      workPlaces: this.formBuilder.array([])
    });

    this.trainersService.getWorkExperienceByTrainerId(this.trainerId).subscribe((response) => {
      response.forEach(i => this.addWorkExperience(i));
    });
  }

  addWorkExperience(experience?: any) {
    let place;
    if (experience) {
      place = this.formBuilder.group({
        id: [experience.id],
        fromDate: [experience.fromDate, [Validators.required]],
        toPresent: [false],
        toDate: [experience.toDate],
        company: [experience.company, [Validators.required]],
        position: [experience.position, [Validators.required]],
        description: [experience.description, [Validators.required]],
        skills: [experience.skills]
      });
    } else {
      place = this.formBuilder.group({
        id: [0],
        fromDate: [new Date(), [Validators.required]],
        toPresent: [false],
        toDate: [new Date()],
        company: ['', [Validators.required]],
        position: ['', [Validators.required]],
        description: ['', [Validators.required]],
        skills: [[]]
      });
    }

    this.workPlaces.push(place);
  }

  deleteWorkExperience(experience: any) {
    this.workPlaces.removeAt(experience);
  }

  get workPlaces() {
    return this.form.get('workPlaces') as FormArray;
  }

  saveChanges() {
    if (this.form.invalid) {
      return;
    }

    this.isSaving = true;
    this.trainersService.updateWorkExperienceByTrainerId(this.trainerId, this.workPlaces.value).subscribe((response) => {
      if (!response.error) {
        this.router.navigate(['trainers', this.trainerId]).then(() => {
          this.isSaving = false;
        });
      } else {
        this.isSaving = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['trainers', this.trainerId]);
  }
}
