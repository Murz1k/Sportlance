import {Paths} from './paths';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RootComponent} from './components/root/root.component';
import {TrainersComponent} from "./components/trainers/trainers.component";
import {LandingComponent} from "./components/landing/landing.component";

const appRoutes: Routes = [
  {
    path: Paths.Root, component: RootComponent, children: [
    {path: Paths.Root, pathMatch: 'full', component: LandingComponent},
    {path: Paths.Trainers + '/:id', pathMatch: 'full', component: TrainersComponent}
  ]
  },
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
