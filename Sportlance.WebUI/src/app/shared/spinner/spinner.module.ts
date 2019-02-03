import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SlSpinnerDirective} from "./spinner.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SlSpinnerDirective],
  exports: [SlSpinnerDirective]
})
export class SlSpinnerModule {
}
