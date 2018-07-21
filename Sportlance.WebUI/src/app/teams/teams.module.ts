import {NgModule} from '@angular/core';
import {TeamsRoutingModule} from './teams-routing.module';
import {CommonModule} from '@angular/common';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TeamsComponent} from './teams/teams.component';
import {TeamProfileComponent} from './team-profile/team-profile.component';

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
    TeamProfileComponent
  ]
})
export class TeamsModule {
}
