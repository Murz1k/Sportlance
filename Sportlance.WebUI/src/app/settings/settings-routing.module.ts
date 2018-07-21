import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingsComponent} from './settings.component';
import {CreateTeamComponent} from './create-team/create-team.component';

const routes: Routes = [
  {path: '', component: SettingsComponent},
  {path: 'my-teams/create', component: CreateTeamComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SettingsRoutingModule {
}
