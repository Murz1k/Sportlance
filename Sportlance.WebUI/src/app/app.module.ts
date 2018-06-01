import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {DataListModule} from 'primeng/datalist';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {RootComponent} from './components/root/root.component';
import {TrainersComponent} from './components/trainers/trainers.component';

import {SportService} from './services/sport.service';
import {AuthApiClient} from './services/auth-api-client';
import {TrainersService} from './services/trainers.service/trainers.service';
import {AccountService} from './services/account-service';
import {AppRoutingModule} from './app-routing.module';
import {LandingComponent} from './components/landing/landing.component';
import {ProfileComponent} from './components/profile/profile.component';
import {FooterComponent} from './components/footer/footer.component';
import {SignupComponent} from './components/signup/signup.component';
import {LoginComponent} from './components/login/login.component';
import {ConfirmRegisterComponent} from './components/confirm-register/confirm-register.component';
import {UserInfoStorage} from './core/user-info-storage';
import {ProfileApiClient} from './api/profile/profile-api-client';
import {InitializationComponent} from './components/initialization/initialization.component';
import {InitializationGuard} from './guards/initialization.guard';
import {InitializationService} from './services/initialization/initialization.service';
import {UserApiClient} from './api/user/user-api.client';
import {UserService} from './services/user.service/user.service';
import {JwtInterceptor} from './api/jwt-Interceptor';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AccountComponent} from './components/account/account.component';
import {EmailVerifyComponent} from './components/email-verify/email-verify.component';
import {EmailConfirmationGuard} from './guards/email-confirmation-guard';
import {MatRadioModule} from "@angular/material";


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
    InitializationComponent,
    AccountComponent,
    EmailVerifyComponent
  ],
  imports: [
    BrowserModule,
    DataListModule,
    NgbModule.forRoot(),
    MatToolbarModule,
    MatCheckboxModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    HttpClientModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatRadioModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    SportService,
    TrainersService,
    AccountService,
    AuthApiClient,
    ProfileApiClient,
    UserInfoStorage,
    InitializationGuard,
    EmailConfirmationGuard,
    UserService,
    UserApiClient,
    InitializationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
