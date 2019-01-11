import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {EditAccountInfoDialogComponent} from './edit-account-info-dialog/edit-account-info-dialog.component';
import {ContactInfoComponent} from './contact-info.component';
import {ContactInfoRoutingModule} from './contact-info-routing.module';
import {SlButtonModule} from "../../shared/button/button.module";
import {SlInputModule} from "../../shared/input/input.module";

@NgModule({
  declarations: [
    ContactInfoComponent,
    EditAccountInfoDialogComponent
  ],
  entryComponents: [EditAccountInfoDialogComponent],
  imports: [
    CommonModule,
    ContactInfoRoutingModule,
    ReactiveFormsModule,
    SlButtonModule,
    SlInputModule,
    MatDialogModule
  ]
})
export class ContactInfoModule {
}
