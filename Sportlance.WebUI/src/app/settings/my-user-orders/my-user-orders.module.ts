import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MyUserOrdersComponent} from './my-user-orders.component';
import {SlButtonModule} from "../../shared/button/button.module";
import {SlInputModule} from "../../shared/input/input.module";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', component: MyUserOrdersComponent}
];

@NgModule({
  declarations: [
    MyUserOrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SlButtonModule,
    SlInputModule
  ]
})
export class MyUserOrdersModule {
}
