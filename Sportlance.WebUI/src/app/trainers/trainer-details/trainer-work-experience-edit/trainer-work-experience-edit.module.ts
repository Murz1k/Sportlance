import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainerWorkExperienceEditComponent} from './trainer-work-experience-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {SlInputModule} from '../../../shared/input/input.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SlButtonModule} from '../../../shared/button/button.module';

const routes: Routes = [
  {path: '', component: TrainerWorkExperienceEditComponent}
];

@NgModule({
  declarations: [TrainerWorkExperienceEditComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SlInputModule,
    SlButtonModule,
    ReactiveFormsModule
  ]
})
export class TrainerWorkExperienceEditModule {
}
