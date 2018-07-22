import {NgModule} from '@angular/core';
import {TrainersRoutingModule} from './trainers-routing.module';
import {TrainersComponent} from './trainers/trainers.component';
import {ProfileComponent} from './profile/profile.component';
import {CommonModule} from '@angular/common';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FormsModule} from '@angular/forms';
import {NumberOnlyModule} from '../core/number-only/number-only.module';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    FormsModule,
    TrainersRoutingModule,
    NumberOnlyModule
  ],
  entryComponents: [
  ],
  declarations: [
    TrainersComponent,
    ProfileComponent
  ]
})
export class TrainersModule {
}
