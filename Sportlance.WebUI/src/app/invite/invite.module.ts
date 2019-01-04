import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {InviteComponent} from "./invite.component";
import {RedirectInviteResolver} from "./redirect-invite.resolver";
import {SlButtonModule} from "../shared/button/button.module";

const routes: Routes = [
  {path: ':link', component: InviteComponent, resolve: {user: RedirectInviteResolver}}
];

@NgModule({
  declarations: [InviteComponent],
  imports: [
    RouterModule.forChild(routes),
    SlButtonModule,
    CommonModule
  ],
  providers: [RedirectInviteResolver]
})
export class InviteModule {
}
