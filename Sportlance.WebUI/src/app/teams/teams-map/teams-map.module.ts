import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamsMapComponent} from "./teams-map.component";
import {HeaderModule} from "../../core/header/header.module";
import {RouterModule, Routes} from "@angular/router";

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
  ]
})
export class TeamsMapModule {
}
