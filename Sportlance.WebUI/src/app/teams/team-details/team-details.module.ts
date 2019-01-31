import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material';
import {NumberOnlyModule} from '../../shared/number-only/number-only.module';
import {AddTeamPhotoDialogComponent} from './team-photo-collection/add-team-photo-dialog/add-team-photo-dialog.component';
import {TeamDetailsRoutingModule} from './team-details-routing.module';
import {TeamDetailsComponent} from './team-details.component';
import {SlButtonModule} from "../../shared/button/button.module";
import {TeamPhotoCollectionComponent} from './team-photo-collection/team-photo-collection.component';
import {TeamMembersCollectionComponent} from './team-members-collection/team-members-collection.component';
import {TeamServiceCollectionComponent} from './team-service-collection/team-service-collection.component';
import {EditServiceDialogComponent} from './team-service-collection/edit-service-dialog/edit-service-dialog.component';
import {TeamServiceCollectionItemComponent} from './team-service-collection/team-service-collection-item/team-service-collection-item.component';
import {SlInputModule} from "../../shared/input/input.module";
import {PhoneMaskPipeModule} from '../../shared/phone-mask-pipe/phone-mask-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TeamDetailsRoutingModule,
    NumberOnlyModule,
    MatDialogModule,
    SlInputModule,
    PhoneMaskPipeModule,
    SlButtonModule
  ],
  entryComponents: [
    AddTeamPhotoDialogComponent,
    EditServiceDialogComponent
  ],
  declarations: [
    AddTeamPhotoDialogComponent,
    TeamDetailsComponent,
    TeamPhotoCollectionComponent,
    TeamMembersCollectionComponent,
    TeamServiceCollectionComponent,
    EditServiceDialogComponent,
    TeamServiceCollectionItemComponent
  ]
})
export class TeamDetailsModule {
}
