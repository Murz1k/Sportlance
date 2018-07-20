import {NgModule} from '@angular/core';
import {SettingsRoutingModule} from './settings-routing.module';
import {CommonModule} from '@angular/common';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SettingsComponent} from './settings.component';
import {ContactInfoComponent} from './contact-info/contact-info.component';
import {MyTeamsComponent} from './my-teams/my-teams.component';
import {PasswordAndSecurityComponent} from './password-and-security/password-and-security.component';

@NgModule({
  declarations: [
    SettingsComponent,
    ContactInfoComponent,
    MyTeamsComponent,
    PasswordAndSecurityComponent
  ],
  entryComponents: [
  ],
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
