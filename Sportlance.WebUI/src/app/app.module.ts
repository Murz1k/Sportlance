import {ErrorHandler, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {RootComponent} from './root/root.component';
import {TrainersService} from './trainers/trainers.service';
import {AppRoutingModule} from './app-routing.module';
import {LandingComponent} from './landing/landing.component';
import {JwtInterceptor} from './core/jwt-Interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FeedbacksService} from './shared/feedbacks/feedbacks.service';
import {FooterModule} from './core/footer/footer.module';
import {HeaderModule} from './core/header/header.module';
import {MomentModule} from 'ngx-moment';
import {BrowserModule} from '@angular/platform-browser';
import {AboutComponent} from './about/about.component';
import {SlButtonModule} from "./shared/button/button.module";
import {GlobalErrorHandler} from "./core/global-error-handler";

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    LandingComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SlButtonModule,
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
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    TrainersService,
    FeedbacksService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
