import {NgModule} from '@angular/core';
import {TeamsRoutingModule} from './teams-routing.module';
import {CommonModule} from '@angular/common';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TeamsComponent} from './teams/teams.component';
import {TeamProfileComponent} from './team-profile/team-profile.component';
import {NumberOnlyModule} from '../core/number-only/number-only.module';
import {MatDialogModule} from '@angular/material';
import {AddTeamPhotoDialogComponent} from './add-team-photo-dialog/add-team-photo-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    TeamsRoutingModule,
    NumberOnlyModule,
    MatDialogModule
  ],
  entryComponents: [
    AddTeamPhotoDialogComponent
  ],
  declarations: [
    TeamsComponent,
    AddTeamPhotoDialogComponent,
    TeamProfileComponent
  ]
})
export class TeamsModule {
}
