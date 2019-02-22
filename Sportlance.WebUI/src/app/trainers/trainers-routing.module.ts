import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainerListComponent} from './trainer-list/trainer-list.component';
import {TrainerDetailsComponent} from './trainer-details/trainer-details.component';
import {AppointmentComponent} from './appointment/appointment.component';
import {RedirectTrainerProfileResolver} from './trainer-details/redirect-trainer-profile.resolver';
import {TrainersAboutComponent} from './trainers-about/trainers-about.component';

const routes: Routes = [
  {path: '', component: TrainerListComponent},
  {path: 'about', component: TrainersAboutComponent},
  {path: ':id', component: TrainerDetailsComponent, resolve: {profile: RedirectTrainerProfileResolver}},
  {path: ':id/appointment', component: AppointmentComponent},
  {path: ':id/experience/edit', loadChildren: './trainer-details/trainer-work-experience-edit/trainer-work-experience-edit.module#TrainerWorkExperienceEditModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainersRoutingModule {
}
