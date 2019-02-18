import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectAddressComponent} from './select-address.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [SelectAddressComponent],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [SelectAddressComponent]
})
export class SlSelectAddressModule {
}
