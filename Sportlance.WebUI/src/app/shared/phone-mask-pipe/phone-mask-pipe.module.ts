import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhoneMaskPipe} from './phone-mask.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PhoneMaskPipe],
  exports: [
    PhoneMaskPipe
  ]
})
export class PhoneMaskPipeModule {
}
