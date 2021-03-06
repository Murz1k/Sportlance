import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimeMaskDirective} from './time-mask.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TimeMaskDirective],
  exports: [
    TimeMaskDirective
  ]
})
export class TimeMaskModule {
}
