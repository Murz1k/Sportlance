import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamServicePaymentComponent} from './team-service-payment.component';
import {RouterModule, Routes} from "@angular/router";
import {RedirectTeamServiceResolver} from "./redirect-team-service.resolver";
import {SlRadioModule} from "../../../shared/radio/radio.module";
import {SlButtonModule} from "../../../shared/button/button.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TeamServicePaymentCashCompleteComponent} from './team-service-payment-cash-complete/team-service-payment-cash-complete.component';
import {RedirectTeamProfileResolver} from "../redirect-team-profile.resolver";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TeamServicePaymentComponent,
    resolve: {teamService: RedirectTeamServiceResolver}
  },
  {
    path: ':paymentId/cash-complete',
    component: TeamServicePaymentCashCompleteComponent,
    resolve: {team: RedirectTeamProfileResolver}
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SlRadioModule,
    ReactiveFormsModule,
    SlButtonModule
  ],
  declarations: [TeamServicePaymentComponent, TeamServicePaymentCashCompleteComponent],
  providers: [RedirectTeamServiceResolver]
})
export class TeamServicePaymentModule {
}
