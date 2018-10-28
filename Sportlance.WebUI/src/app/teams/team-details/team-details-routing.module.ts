import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeamDetailsComponent} from './team-details.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: TeamDetailsComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TeamDetailsRoutingModule {
}
