import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateMaskDirective} from './date-mask.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DateMaskDirective],
    exports: [
      DateMaskDirective
    ]
})
export class DateMaskModule {
}
