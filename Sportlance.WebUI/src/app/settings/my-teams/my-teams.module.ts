import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MyTeamsRoutingModule} from './my-teams-routing.module';
import {MyTeamsComponent} from './my-teams.component';
import {CreateTeamComponent} from './create-team/create-team.component';
import {PhoneMaskModule} from '../../shared/phone-mask/phone-mask.module';
import {TeamsResolver} from './teams.resolver';
import {MyTeamsService} from './my-teams.service';

@NgModule({
  declarations: [
    MyTeamsComponent,
    CreateTeamComponent
  ],
  imports: [
    CommonModule,
    MyTeamsRoutingModule,
    PhoneMaskModule,
    ReactiveFormsModule
  ],
  providers: [
    MyTeamsService,
    TeamsResolver
  ]
})
export class MyTeamsModule {
}
