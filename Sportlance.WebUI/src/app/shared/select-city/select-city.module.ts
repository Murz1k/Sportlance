import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SlSelectCityComponent} from './select-city.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SlSelectModule} from '../select/select.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SlSelectModule
  ],
  declarations: [SlSelectCityComponent],
  exports: [SlSelectCityComponent]
})
export class SlSelectCityModule {
}
