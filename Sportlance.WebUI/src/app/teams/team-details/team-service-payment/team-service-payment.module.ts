import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamServicePaymentComponent} from './team-service-payment.component';
import {RouterModule, Routes} from "@angular/router";
import {RedirectTeamServiceResolver} from "./redirect-team-service.resolver";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TeamServicePaymentComponent,
    resolve: {teamService: RedirectTeamServiceResolver}
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [TeamServicePaymentComponent]
})
export class TeamServicePaymentModule {
}
