import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmailVerifyComponent} from './email-verify.component';
import {HeaderModule} from '../core/header/header.module';
import {EmailVerifyRoutingModule} from './email-verify-routing.module';
import {FooterModule} from "../core/footer/footer.module";
import {SlButtonModule} from "../shared/button/button.module";
import {EmailIsConfirmedGuard} from "./email-is-confirmed.guard";

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    SlButtonModule,
    EmailVerifyRoutingModule
  ],
  declarations: [
    EmailVerifyComponent
  ],
  providers: [
    EmailIsConfirmedGuard
  ]
})
export class EmailVerifyModule {
}
