import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountComponent} from './account.component';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {AccountRoutingModule} from './account-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    RouterModule,
    AccountRoutingModule
  ],
  entryComponents: [
  ],
  declarations: [
    AccountComponent
  ]
})
export class AccountModule {
}
