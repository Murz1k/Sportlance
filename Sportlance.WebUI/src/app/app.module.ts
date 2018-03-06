import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import { RootComponent } from './components/root/root.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{ path: '', component: RootComponent}]),
    MatToolbarModule,
    FormsModule,
    AutoCompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
