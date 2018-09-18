import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeamsService} from '../../../services/teams/teams.service';
import {Paths} from '../../../core/paths';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent {
  public form: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private teamsService: TeamsService) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      about: ['']
    });
  }

  submit() {
    this.teamsService.add(
      this.form.controls['title'].value,
      this.form.controls['subtitle'].value,
      this.form.controls['phoneNumber'].value,
      this.form.controls['country'].value,
      this.form.controls['city'].value,
      this.form.controls['about'].value,
      null
    ).subscribe(() => {
      return this.router.navigate([Paths.Settings, 'my-teams']);
    });
  }
}
