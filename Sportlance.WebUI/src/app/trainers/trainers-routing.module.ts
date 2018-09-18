import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainersComponent} from './trainers/trainers.component';
import {ProfileComponent} from './profile/profile.component';
import {AppointmentComponent} from './appointment/appointment.component';
import {RedirectTrainerProfileResolver} from './profile/redirect-trainer-profile.resolver';

const routes: Routes = [
  {path: '', component: TrainersComponent},
  {path: ':id', component: ProfileComponent, resolve: {profile: RedirectTrainerProfileResolver}},
  {path: ':id/appointment', component: AppointmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainersRoutingModule {
}
