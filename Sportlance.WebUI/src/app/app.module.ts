import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {RootComponent} from './components/root/root.component';
import {TrainersComponent} from './components/trainers/trainers.component';

import {SportService} from './services/sport.service';
import {AuthApiClient} from './services/auth-api-client';
import {TrainerService} from './services/trainer.service';
import {AccountService} from './services/account-service';
import {AppRoutingModule} from './app-routing.module';
import {LandingComponent} from './components/landing/landing.component';
import {ProfileComponent} from './components/profile/profile.component';
import {FooterComponent} from './components/footer/footer.component';
import {SignupComponent} from './components/signup/signup.component';
import {LoginComponent} from './components/login/login.component';
import {ConfirmRegisterComponent} from './components/confirm-register/confirm-register.component';
import {UserInfoStorage} from "./core/user-info-storage";
import {ProfileApiClient} from "./api/profile/profile-api-client";
import { InitializationComponent } from './components/initialization/initialization.component';
import {InitializationGuard} from "./services/initialization/initialization.guard";
import {InitializationService} from "./services/initialization/initialization.service";
import {UserApiClient} from "./api/user/user-api.client";
import {UserService} from "./services/user.service/user.service";
import {JwtInterceptor} from "./api/jwt-Interceptor";


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
    LoginComponent,
    ConfirmRegisterComponent,
    InitializationComponent
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    SportService,
    TrainerService,
    AccountService,
    AuthApiClient,
    ProfileApiClient,
    UserInfoStorage,
    InitializationGuard,
    UserService,
    UserApiClient,
    InitializationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
