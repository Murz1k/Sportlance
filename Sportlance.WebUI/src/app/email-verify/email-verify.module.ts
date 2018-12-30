import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmailVerifyComponent} from './email-verify.component';
import {HeaderModule} from '../core/header/header.module';
import {EmailVerifyRoutingModule} from './email-verify-routing.module';
import {FooterModule} from "../core/footer/footer.module";

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    EmailVerifyRoutingModule
  ],
  declarations: [
    EmailVerifyComponent
  ]
})
export class EmailVerifyModule {
}
