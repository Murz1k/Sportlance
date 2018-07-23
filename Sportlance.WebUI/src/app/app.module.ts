import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
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
import {InitializationComponent} from './components/initialization/initialization.component';
import {InitializationGuard} from './guards/initialization.guard';
import {InitializationService} from './services/initialization/initialization.service';
import {UserApiClient} from './services/user/user-api.client';
import {UserService} from './services/user.service/user.service';
import {JwtInterceptor} from './services/common/jwt-Interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AccountComponent} from './components/account/account.component';
import {EmailVerifyComponent} from './components/email-verify/email-verify.component';
import {EmailConfirmationGuard} from './guards/email-confirmation-guard';
import {MatRadioModule} from '@angular/material';
import {DialogService} from './services/dialog.service';
import {MatDialogModule} from '@angular/material/dialog';
import {EditPhotoDialogComponent} from './components/common/edit-photo-dialog/edit-photo-dialog.component';
import {TeamsService} from './services/teams/teams.service';
import {AddTeamPhotoDialogComponent} from './components/common/add-team-photo-dialog/add-team-photo-dialog.component';
import {EditBackgroundDialogComponent} from './components/common/edit-background-dialog/edit-background-dialog.component';
import {FeedbacksService} from './services/feedbacks/feedbacks.service';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MenuComponent} from './components/header/menu/menu.component';
import {EditTrainerPaidDialogComponent} from './trainers/edit-trainer-paid-dialog/edit-trainer-paid-dialog.component';
import {EditTrainerAboutDialogComponent} from './trainers/edit-trainer-about-dialog/edit-trainer-about-dialog.component';
import {EditPasswordDialogComponent} from './settings/edit-password-dialog/edit-password-dialog.component';
import {EditAccountInfoDialogComponent} from './settings/edit-account-info-dialog/edit-account-info-dialog.component';
import {InviteTrainerDialogComponent} from './teams/invite-trainer-dialog/invite-trainer-dialog.component';
import {SelectModule} from './core/select/select.module';


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
    InitializationComponent,
    AccountComponent,
    EditPhotoDialogComponent,
    EmailVerifyComponent,
    AddTeamPhotoDialogComponent,
    EditBackgroundDialogComponent,
    EditAccountInfoDialogComponent,
    EditPasswordDialogComponent,
    EditTrainerAboutDialogComponent,
    EditTrainerPaidDialogComponent,
    InviteTrainerDialogComponent,
    MenuComponent
  ],
  entryComponents: [
    EditPhotoDialogComponent,
    InviteTrainerDialogComponent,
    AddTeamPhotoDialogComponent,
    EditTrainerAboutDialogComponent,
    EditTrainerPaidDialogComponent,
    EditBackgroundDialogComponent,
    EditAccountInfoDialogComponent,
    EditPasswordDialogComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatCheckboxModule,
    AppRoutingModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    SelectModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    TrainersService,
    AccountService,
    AuthApiClient,
    FeedbacksService,
    DialogService,
    UserInfoStorage,
    TeamsService,
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
