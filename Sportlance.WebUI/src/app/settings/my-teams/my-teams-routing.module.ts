import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateTeamComponent} from './create-team/create-team.component';
import {MyTeamsComponent} from './my-teams.component';

const routes: Routes = [
  {path: '', component: MyTeamsComponent},
  {path: 'create', component: CreateTeamComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MyTeamsRoutingModule {
}
