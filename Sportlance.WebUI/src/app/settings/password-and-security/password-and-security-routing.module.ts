import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PasswordAndSecurityComponent} from './password-and-security.component';

const routes: Routes = [
  {path: '', component: PasswordAndSecurityComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PasswordAndSecurityRoutingModule {
}
