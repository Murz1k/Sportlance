import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {EmailVerifyComponent} from './email-verify.component';
import {EmailIsConfirmedGuard} from "./email-is-confirmed.guard";

const routes: Routes = [
  {path: '', component: EmailVerifyComponent, canActivate: [EmailIsConfirmedGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EmailVerifyRoutingModule {
}
