import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {RootComponent} from './root/root.component';

import {AuthApiClient} from './services/auth/auth-api-client';
import {TrainersService} from './services/trainers/trainers.service';
import {AccountService} from './services/account-service';
import {AppRoutingModule} from './app-routing.module';
import {LandingComponent} from './landing/landing.component';
import {UserInfoStorage} from './core/user-info-storage';
import {UserApiClient} from './services/user/user-api.client';
import {UserService} from './services/user.service/user.service';
import {JwtInterceptor} from './services/common/jwt-Interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DateAdapter, MatNativeDateModule} from '@angular/material';
import {TeamsService} from './services/teams/teams.service';
import {FeedbacksService} from './services/feedbacks/feedbacks.service';
import {MyDateAdapter} from './core/my-date-adapter';
import {FooterModule} from './core/footer/footer.module';
import {HeaderModule} from './core/header/header.module';
import {MomentModule} from 'ngx-moment';

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatNativeDateModule,
    HttpClientModule,
    MomentModule,
    HeaderModule,
    FooterModule,
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
    UserInfoStorage,
    TeamsService,
    UserService,
    UserApiClient
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
