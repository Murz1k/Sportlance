import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SlRadioGroupComponent} from './radio.component';
import {SlRadioButtonComponent} from './radio-button/radio-button.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [SlRadioGroupComponent, SlRadioButtonComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SlRadioGroupComponent,
    SlRadioButtonComponent
  ]
})
export class SlRadioModule {
}
