import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';

import {AppModule} from "./app.module";
import {AppComponent} from "./app.component";
import {RootComponent} from "./root/root.component";
import {LandingComponent} from "./landing/landing.component";
import {AboutComponent} from "./about/about.component";

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    LandingComponent,
    AboutComponent
  ],
  imports: [
    AppModule,
    ServerModule
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {
}
