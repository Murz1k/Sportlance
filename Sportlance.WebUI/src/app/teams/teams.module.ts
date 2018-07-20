import {NgModule} from '@angular/core';
import {TeamsRoutingModule} from './teams-routing.module';
import {CommonModule} from '@angular/common';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TeamsComponent} from '../components/teams/teams.component';
import {TeamProfileComponent} from '../components/team-profile/team-profile.component';
import {CreateTeamComponent} from "../components/create-team/create-team.component";

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    TeamsRoutingModule
  ],
  entryComponents: [
  ],
  declarations: [
    TeamsComponent,
    TeamProfileComponent,
    CreateTeamComponent
  ]
})
export class TeamsModule {
}
