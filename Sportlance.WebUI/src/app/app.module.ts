import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {RootComponent} from './components/root/root.component';

import {SportService} from './services/sport.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{path: '', component: RootComponent}]),
    MatToolbarModule,
    FormsModule,
    AutoCompleteModule,
    HttpClientModule
  ],
  providers: [
    SportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
