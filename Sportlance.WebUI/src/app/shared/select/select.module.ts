import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SlSelectComponent} from './select.component';
import {SlOptionModule} from "../option/option.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SlOptionComponent} from "../option/option.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SlOptionModule
  ],
  declarations: [SlSelectComponent],
  exports: [SlSelectComponent, SlOptionComponent]
})
export class SlSelectModule {
}
