import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmailVerifyComponent} from './email-verify.component';
import {HeaderModule} from '../core/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule
  ],
  declarations: [
    EmailVerifyComponent
  ]
})
export class EmailVerifyModule {
}
