import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingsComponent} from './settings.component';
import {BeTrainerComponent} from './be-trainer/be-trainer.component';

const routes: Routes = [
  {
    path: '', component: SettingsComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'contact-info'},
      {path: 'contact-info', loadChildren: './contact-info/contact-info.module#ContactInfoModule'},
      {path: 'my-teams', loadChildren: './my-teams/my-teams.module#MyTeamsModule'},
      {path: 'security', loadChildren: './password-and-security/password-and-security.module#PasswordAndSecurityModule'},
      {path: 'be-trainer', pathMatch: 'full', component: BeTrainerComponent}
    ]
  },
  {path: '**', redirectTo: 'contact-info'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SettingsRoutingModule {
}
