import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeamsComponent} from './teams/teams.component';
import {TeamProfileComponent} from './team-profile/team-profile.component';
import {RedirectTeamProfileResolver} from './team-profile/redirect-team-profile.resolver';

const routes: Routes = [
  {path: '', component: TeamsComponent},
  {path: ':id', component: TeamProfileComponent, resolve: {profile: RedirectTeamProfileResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TeamsRoutingModule {
}
