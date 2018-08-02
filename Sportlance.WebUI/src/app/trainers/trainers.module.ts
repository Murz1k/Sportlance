import {NgModule} from '@angular/core';
import {TrainersRoutingModule} from './trainers-routing.module';
import {TrainersComponent} from './trainers/trainers.component';
import {ProfileComponent} from './profile/profile.component';
import {CommonModule} from '@angular/common';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppointmentComponent} from './appointment/appointment.component';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    TrainersRoutingModule
  ],
  entryComponents: [],
  declarations: [
    TrainersComponent,
    ProfileComponent,
    AppointmentComponent
  ]
})
export class TrainersModule {
}
