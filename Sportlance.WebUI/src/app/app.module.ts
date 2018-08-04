import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {RootComponent} from './components/root/root.component';

import {AuthApiClient} from './services/auth/auth-api-client';
import {TrainersService} from './services/trainers/trainers.service';
import {AccountService} from './services/account-service';
import {AppRoutingModule} from './app-routing.module';
import {LandingComponent} from './components/landing/landing.component';
import {FooterComponent} from './components/footer/footer.component';
import {SignupComponent} from './components/signup/signup.component';
import {LoginComponent} from './components/login/login.component';
import {ConfirmRegisterComponent} from './components/confirm-register/confirm-register.component';
import {UserInfoStorage} from './core/user-info-storage';
import {UserApiClient} from './services/user/user-api.client';
import {UserService} from './services/user.service/user.service';
import {JwtInterceptor} from './services/common/jwt-Interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EmailVerifyComponent} from './components/email-verify/email-verify.component';
import {EmailConfirmationGuard} from './guards/email-confirmation-guard';
import {DateAdapter, MatNativeDateModule} from '@angular/material';
import {DialogService} from './services/dialog.service';
import {MatDialogModule} from '@angular/material/dialog';
import {EditPhotoDialogComponent} from './components/common/edit-photo-dialog/edit-photo-dialog.component';
import {TeamsService} from './services/teams/teams.service';
import {EditBackgroundDialogComponent} from './components/common/edit-background-dialog/edit-background-dialog.component';
import {FeedbacksService} from './services/feedbacks/feedbacks.service';
import {MenuComponent} from './components/header/menu/menu.component';
import {EditTrainerPaidDialogComponent} from './trainers/edit-trainer-paid-dialog/edit-trainer-paid-dialog.component';
import {EditTrainerAboutDialogComponent} from './trainers/edit-trainer-about-dialog/edit-trainer-about-dialog.component';
import {MomentModule} from 'ngx-moment';
import {MyDateAdapter} from './core/my-date-adapter';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RootComponent,
    LandingComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    ConfirmRegisterComponent,
    EmailVerifyComponent,
    EditBackgroundDialogComponent,
    EditTrainerAboutDialogComponent,
    EditTrainerPaidDialogComponent,
    EditPhotoDialogComponent,
    MenuComponent
  ],
  entryComponents: [
    EditPhotoDialogComponent,
    EditTrainerAboutDialogComponent,
    EditTrainerPaidDialogComponent,
    EditBackgroundDialogComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatCheckboxModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    HttpClientModule,
    MomentModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {provide: DateAdapter, useClass: MyDateAdapter},
    TrainersService,
    AccountService,
    AuthApiClient,
    FeedbacksService,
    DialogService,
    UserInfoStorage,
    TeamsService,
    EmailConfirmationGuard,
    UserService,
    UserApiClient
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
