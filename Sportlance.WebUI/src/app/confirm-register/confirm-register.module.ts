import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmRegisterComponent} from './confirm-register.component';
import {ConfirmRegisterRoutingModule} from './confirm-register-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ConfirmRegisterRoutingModule
  ],
  declarations: [
    ConfirmRegisterComponent
  ],
  exports: [
    ConfirmRegisterComponent
  ]
})
export class ConfirmRegisterModule {
}
