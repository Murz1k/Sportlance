import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {FooterModule} from '../core/footer/footer.module';
import {HeaderModule} from '../core/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FooterModule,
    HeaderModule,
    LoginRoutingModule
  ],
  entryComponents: [
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {
}
