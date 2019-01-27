import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Paths} from '../../../core/paths';
import {Router} from '@angular/router';
import {MyTeamsService} from '../my-teams.service';
import {catchError, tap} from "rxjs/operators";
import {Title} from "@angular/platform-browser";
import {throwError} from "rxjs";

@Component({
  selector: 'sl-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {

  public form: FormGroup;

  public isLoading = false;
  public isDisabled = false;

  constructor(private titleService: Title,
              private router: Router,
              private formBuilder: FormBuilder,
              private teamsService: MyTeamsService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(`Создать команду | Sportlance`);

    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      // country: ['', Validators.required],
      city: ['', [Validators.required]],
      about: ['']
    });
  }

  submit() {
    for (let key in this.form.value) {
      this.form.controls[key].markAsDirty();
    }

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    this.isDisabled = true;

    this.teamsService.add(
      this.form.controls['title'].value,
      this.form.controls['subtitle'].value,
      this.form.controls['phoneNumber'].value,
      // this.form.controls['country'].value,
      undefined,
      this.form.controls['city'].value,
      this.form.controls['about'].value,
      null
    ).pipe(tap((response: any) => {
      if (!response || !response.error) {
        this.router.navigate([Paths.Settings, 'my-teams']);
      }
      this.isDisabled = false;
      this.isLoading = false;
    }), catchError((error) => {
      this.isDisabled = false;
      this.isLoading = false;
      return throwError(error);
    })).subscribe();
  }
}
