import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordAndSecurityRoutingModule} from './password-and-security-routing.module';
import {PasswordAndSecurityComponent} from './password-and-security.component';
import {EditPasswordDialogComponent} from './edit-password-dialog/edit-password-dialog.component';
import {MatDialogModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {SlButtonModule} from "../../shared/button/button.module";
import {SlInputModule} from "../../shared/input/input.module";

@NgModule({
  declarations: [
    PasswordAndSecurityComponent,
    EditPasswordDialogComponent
  ],
  entryComponents: [EditPasswordDialogComponent],
  imports: [
    CommonModule,
    PasswordAndSecurityRoutingModule,
    MatDialogModule,
    SlButtonModule,
    SlInputModule,
    ReactiveFormsModule
  ]
})
export class PasswordAndSecurityModule {
}
