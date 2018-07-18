import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {RootComponent} from './components/root/root.component';
import {TrainersComponent} from './components/trainers/trainers.component';

import {SportService} from './services/sports/sport.service';
import {AuthApiClient} from './services/auth/auth-api-client';
import {TrainersService} from './services/trainers/trainers.service';
import {AccountService} from './services/account-service';
import {AppRoutingModule} from './app-routing.module';
import {LandingComponent} from './components/landing/landing.component';
import {ProfileComponent} from './components/profile/profile.component';
import {FooterComponent} from './components/footer/footer.component';
import {SignupComponent} from './components/signup/signup.component';
import {LoginComponent} from './components/login/login.component';
import {ConfirmRegisterComponent} from './components/confirm-register/confirm-register.component';
import {UserInfoStorage} from './core/user-info-storage';
import {ProfileApiClient} from './services/profile/profile-api-client';
import {InitializationComponent} from './components/initialization/initialization.component';
import {InitializationGuard} from './guards/initialization.guard';
import {InitializationService} from './services/initialization/initialization.service';
import {UserApiClient} from './services/user/user-api.client';
import {UserService} from './services/user.service/user.service';
import {JwtInterceptor} from './services/common/jwt-Interceptor';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AccountComponent} from './components/account/account.component';
import {EmailVerifyComponent} from './components/email-verify/email-verify.component';
import {EmailConfirmationGuard} from './guards/email-confirmation-guard';
import {MatRadioModule} from '@angular/material';
import {DialogService} from './services/dialog.service';
import {EditTrainerAboutDialogComponent} from './components/common/edit-trainer-about-dialog/edit-trainer-about-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {EditPhotoDialogComponent} from "./components/common/edit-photo-dialog/edit-photo-dialog.component";
import {EditTrainerPaidDialogComponent} from "./components/common/edit-trainer-paid-dialog/edit-trainer-paid-dialog.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {ContactInfoComponent} from "./components/settings/contact-info/contact-info.component";
import {EditAccountInfoDialogComponent} from "./components/common/edit-account-info-dialog/edit-account-info-dialog.component";
import {MyTeamsComponent} from "./components/settings/my-teams/my-teams.component";
import {PasswordAndSecurityComponent} from "./components/settings/password-and-security/password-and-security.component";
import {CreateTeamComponent} from "./components/create-team/create-team.component";
import {EditPasswordDialogComponent} from "./components/common/edit-password-dialog/edit-password-dialog.component";
import {TeamsComponent} from "./components/teams/teams.component";
import {TeamsService} from "./services/teams/teams.service";
import {TeamProfileComponent} from './components/team-profile/team-profile.component';
import {AddTeamPhotoDialogComponent} from './components/common/add-team-photo-dialog/add-team-photo-dialog.component';
import {EditBackgroundDialogComponent} from "./components/common/edit-background-dialog/edit-background-dialog.component";
import {FeedbacksService} from './services/feedbacks/feedbacks.service';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {NumberOnlyDirective} from "./core/number-only.directive";
import { MenuComponent } from './components/header/menu/menu.component';


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
    EditPhotoDialogComponent,
    EditTrainerAboutDialogComponent,
    EmailVerifyComponent,
    EditTrainerPaidDialogComponent,
    SettingsComponent,
    ContactInfoComponent,
    EditAccountInfoDialogComponent,
    MyTeamsComponent,
    PasswordAndSecurityComponent,
    CreateTeamComponent,
    EditPasswordDialogComponent,
    TeamsComponent,
    TeamProfileComponent,
    AddTeamPhotoDialogComponent,
    EditBackgroundDialogComponent,
    NumberOnlyDirective,
    MenuComponent
  ],
  entryComponents: [
    EditPhotoDialogComponent,
    EditTrainerPaidDialogComponent,
    EditTrainerAboutDialogComponent,
    EditAccountInfoDialogComponent,
    EditPasswordDialogComponent,
    AddTeamPhotoDialogComponent,
    EditBackgroundDialogComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    MatToolbarModule,
    MatCheckboxModule,
    AppRoutingModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatDialogModule,
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
    FeedbacksService,
    ProfileApiClient,
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
