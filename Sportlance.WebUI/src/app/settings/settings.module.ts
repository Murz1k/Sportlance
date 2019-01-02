import {NgModule} from '@angular/core';
import {SettingsRoutingModule} from './settings-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SettingsComponent} from './settings.component';
import {BeTrainerComponent} from './be-trainer/be-trainer.component';
import {MatDialogModule} from '@angular/material';
import {SlButtonModule} from "../shared/button/button.module";

@NgModule({
  declarations: [
    SettingsComponent,
    BeTrainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    MatDialogModule,
    SlButtonModule
  ]
})
export class SettingsModule {
}
