import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from './account.component';
import {ResetPasswordComponent} from "./reset-password/reset-password.component";

const routes: Routes = [
  {path: '', component: AccountComponent},
  {path: 'reset-password', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountRoutingModule {
}
