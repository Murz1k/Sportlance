import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';

import {AppModule} from './app.module';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
import {AppComponent} from './app.component';

@NgModule({
  imports: [
    AppModule,
    ModuleMapLoaderModule,
    ServerModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {
}
