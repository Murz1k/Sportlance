import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {EmailVerifyComponent} from './email-verify.component';

const routes: Routes = [
  {path: '', component: EmailVerifyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EmailVerifyRoutingModule {
}
