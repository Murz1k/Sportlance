import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {FooterModule} from '../core/footer/footer.module';
import {HeaderModule} from '../core/header/header.module';
import {SlButtonModule} from '../shared/button/button.module';
import {SlInputModule} from '../shared/input/input.module';

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FooterModule,
    HeaderModule,
    SlButtonModule,
    SlInputModule,
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
