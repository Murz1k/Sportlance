import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmailVerifyComponent} from './email-verify.component';
import {HeaderModule} from '../core/header/header.module';
import {EmailVerifyRoutingModule} from './email-verify-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    EmailVerifyRoutingModule
  ],
  declarations: [
    EmailVerifyComponent
  ]
})
export class EmailVerifyModule {
}
