import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainersComponent} from './trainers/trainers.component';
import {ProfileComponent} from './profile/profile.component';
import {AppointmentComponent} from './appointment/appointment.component';

const routes: Routes = [
  {path: '', component: TrainersComponent},
  {path: ':id', component: ProfileComponent},
  {path: ':id/appointment', component: AppointmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainersRoutingModule {
}
