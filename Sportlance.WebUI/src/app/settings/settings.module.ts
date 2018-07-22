import {NgModule} from '@angular/core';
import {SettingsRoutingModule} from './settings-routing.module';
import {CommonModule} from '@angular/common';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SettingsComponent} from './settings.component';
import {ContactInfoComponent} from './contact-info/contact-info.component';
import {MyTeamsComponent} from './my-teams/my-teams.component';
import {PasswordAndSecurityComponent} from './password-and-security/password-and-security.component';
import {CreateTeamComponent} from './create-team/create-team.component';
import {PhoneMaskDirective} from '../core/phone-mask.directive';
import { BeTrainerComponent } from './be-trainer/be-trainer.component';

@NgModule({
  declarations: [
    SettingsComponent,
    ContactInfoComponent,
    MyTeamsComponent,
    PasswordAndSecurityComponent,
    CreateTeamComponent,
    PhoneMaskDirective,
    BeTrainerComponent
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule {
}
