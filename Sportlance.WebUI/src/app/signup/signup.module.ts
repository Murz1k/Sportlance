import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SignupRoutingModule} from './signup-routing.module';
import {FooterModule} from '../core/footer/footer.module';
import {SignupComponent} from './signup.component';
import {HeaderModule} from '../core/header/header.module';
import {MatCheckboxModule} from '@angular/material';
import {SlButtonModule} from "../shared/button/button.module";

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FooterModule,
    HeaderModule,
    SlButtonModule,
    SignupRoutingModule
  ],
  entryComponents: [
  ],
  declarations: [
    SignupComponent
  ]
})
export class SignupModule {
}
