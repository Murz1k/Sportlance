import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateTeamComponent} from './create-team/create-team.component';
import {MyTeamsComponent} from './my-teams.component';
import {TeamsResolver} from './teams.resolver';

const routes: Routes = [
  {path: '', component: MyTeamsComponent, resolve: {teams: TeamsResolver}},
  {path: 'create', component: CreateTeamComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MyTeamsRoutingModule {
}
