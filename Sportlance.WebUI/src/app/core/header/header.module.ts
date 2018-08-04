import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {MenuComponent} from './menu/menu.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    MenuComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {
}
