import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OptionComponent, SlOptionComponent} from './option.component';

@NgModule({
  declarations: [SlOptionComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SlOptionComponent
  ]
})
export class SlOptionModule {
}
