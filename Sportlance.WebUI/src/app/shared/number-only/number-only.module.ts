import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NumberOnlyDirective} from './number-only.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NumberOnlyDirective],
  exports: [
    NumberOnlyDirective
  ]
})
export class NumberOnlyModule {
}
