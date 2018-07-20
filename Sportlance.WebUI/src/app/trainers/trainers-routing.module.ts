import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainersComponent} from './trainers/trainers.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {path: '', component: TrainersComponent},
  {path: ':id', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainersRoutingModule {
}
