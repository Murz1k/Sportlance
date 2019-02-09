import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeamListComponent} from './team-list/team-list.component';
import {RedirectTeamProfileResolver} from './team-details/redirect-team-profile.resolver';
import {TeamMapComponent} from "./team-map/team-map.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: TeamListComponent},
  {path: 'map', pathMatch: 'full', component: TeamMapComponent},
  {path: ':id', loadChildren: './team-details/team-details.module#TeamDetailsModule', resolve: {profile: RedirectTeamProfileResolver}},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TeamsRoutingModule {
}
