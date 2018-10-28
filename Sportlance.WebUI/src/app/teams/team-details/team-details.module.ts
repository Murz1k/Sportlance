import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material';
import {NumberOnlyModule} from '../../core/number-only/number-only.module';
import {AddTeamPhotoDialogComponent} from './add-team-photo-dialog/add-team-photo-dialog.component';
import {TeamDetailsRoutingModule} from './team-details-routing.module';
import {TeamDetailsComponent} from './team-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TeamDetailsRoutingModule,
    NumberOnlyModule,
    MatDialogModule
  ],
  entryComponents: [
    AddTeamPhotoDialogComponent
  ],
  declarations: [
    AddTeamPhotoDialogComponent,
    TeamDetailsComponent
  ]
})
export class TeamDetailsModule {
}
