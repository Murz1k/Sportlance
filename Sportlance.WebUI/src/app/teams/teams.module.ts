import {NgModule} from '@angular/core';
import {TeamsRoutingModule} from './teams-routing.module';
import {CommonModule} from '@angular/common';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TeamListComponent} from './team-list/team-list.component';
import {NumberOnlyModule} from '../shared/number-only/number-only.module';
import {MatDialogModule} from '@angular/material';
import {RedirectTeamProfileResolver} from './team-details/redirect-team-profile.resolver';
import {TeamsService} from './teams.service';
import {SlInputModule} from "../shared/input/input.module";
import {SlSelectCityModule} from "../shared/select-city/select-city.module";
import {SlButtonModule} from "../shared/button/button.module";

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    TeamsRoutingModule,
    NumberOnlyModule,
    MatDialogModule,

    SlInputModule,
    SlSelectCityModule,
    SlButtonModule
  ],
  declarations: [
    TeamListComponent
  ],
  providers: [
    TeamsService,
    RedirectTeamProfileResolver
  ]
})
export class TeamsModule {
}
