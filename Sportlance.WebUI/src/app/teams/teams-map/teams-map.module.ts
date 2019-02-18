/* tslint:disable:quotemark */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamsMapComponent} from './teams-map.component';
import {HeaderModule} from '../../core/header/header.module';
import {RouterModule, Routes} from '@angular/router';
import {TeamsService} from '../teams.service';

const routes: Routes = [
  {path: '', component: TeamsMapComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [TeamsMapComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HeaderModule
  ],
  providers: [
    TeamsService
  ]
})
export class TeamsMapModule {
}
