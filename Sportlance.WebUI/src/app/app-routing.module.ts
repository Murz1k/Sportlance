import {Paths} from './core/paths';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RootComponent} from './root/root.component';
import {LandingComponent} from './landing/landing.component';
import {AboutComponent} from "./about/about.component";

const appRoutes: Routes = [
  {
    path: Paths.Root, component: RootComponent, children: [
      {path: Paths.Root, pathMatch: 'full', component: LandingComponent},
      {path: Paths.Trainers, loadChildren: './trainers/trainers.module#TrainersModule'},
      {path: Paths.Teams, loadChildren: './teams/teams.module#TeamsModule'},
      {path: Paths.Settings, loadChildren: './settings/settings.module#SettingsModule'},
      {path: Paths.Account, loadChildren: './account/account.module#AccountModule'},
      {path: 'about', pathMatch: 'full', component: AboutComponent},
    ]
  },
  {path: Paths.SignUp, loadChildren: './signup/signup.module#SignupModule'},
  {path: 'email-verify', loadChildren: './email-verify/email-verify.module#EmailVerifyModule'},
  {path: Paths.ConfirmRegistration, loadChildren: './confirm-register/confirm-register.module#ConfirmRegisterModule'},
  {path: Paths.Login, loadChildren: './login/login.module#LoginModule'},
  {path: '**', redirectTo: Paths.Root}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
