import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateTeamComponent} from '../components/create-team/create-team.component';
import {TeamsComponent} from '../components/teams/teams.component';
import {TeamProfileComponent} from '../components/team-profile/team-profile.component';

const routes: Routes = [
  {path: '', component: TeamsComponent},
  {path: ':id', component: TeamProfileComponent}//,
  //{path: 'create', pathMatch: 'full', component: CreateTeamComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TeamsRoutingModule {
}
