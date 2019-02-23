import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectShortDateComponent} from './select-short-date.component';
import {SlSelectModule} from '../select/select.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [SelectShortDateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SlSelectModule
  ],
  exports: [SelectShortDateComponent]
})
export class SlSelectShortDateModule {
}
