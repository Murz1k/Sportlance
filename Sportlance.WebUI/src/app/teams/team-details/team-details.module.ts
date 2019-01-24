import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material';
import {NumberOnlyModule} from '../../shared/number-only/number-only.module';
import {AddTeamPhotoDialogComponent} from './team-photo-collection/add-team-photo-dialog/add-team-photo-dialog.component';
import {TeamDetailsRoutingModule} from './team-details-routing.module';
import {TeamDetailsComponent} from './team-details.component';
import {SlSelectCityModule} from "../../shared/select-city/select-city.module";
import {SlButtonModule} from "../../shared/button/button.module";
import { TeamPhotoCollectionComponent } from './team-photo-collection/team-photo-collection.component';
import { TeamMembersCollectionComponent } from './team-members-collection/team-members-collection.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TeamDetailsRoutingModule,
    NumberOnlyModule,
    MatDialogModule,
    SlButtonModule
  ],
  entryComponents: [
    AddTeamPhotoDialogComponent
  ],
  declarations: [
    AddTeamPhotoDialogComponent,
    TeamDetailsComponent,
    TeamPhotoCollectionComponent,
    TeamMembersCollectionComponent
  ]
})
export class TeamDetailsModule {
}
