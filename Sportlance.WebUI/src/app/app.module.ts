import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {RootComponent} from './components/root/root.component';
import {TrainersComponent} from './components/trainers/trainers.component';

import {SportService} from './services/sport.service';
import {TrainerService} from './services/trainer.service';
import {AppRoutingModule} from "./app-routing.module";
import {LandingComponent} from './components/landing/landing.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RootComponent,
    TrainersComponent,
    LandingComponent,
    ProfileComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    MatToolbarModule,
    AppRoutingModule,
    FormsModule,
    AutoCompleteModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    SportService,
    TrainerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
