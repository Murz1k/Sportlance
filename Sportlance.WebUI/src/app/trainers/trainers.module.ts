import {NgModule} from '@angular/core';
import {TrainersRoutingModule} from './trainers-routing.module';
import {TrainerListComponent} from './trainer-list/trainer-list.component';
import {TrainerDetailsComponent} from './trainer-details/trainer-details.component';
import {CommonModule} from '@angular/common';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppointmentComponent} from './appointment/appointment.component';
import {NumberOnlyModule} from '../core/number-only/number-only.module';
import {DateAdapter, MatDialogModule, MatNativeDateModule} from '@angular/material';
import {AddTrainerTrainingDialogComponent} from './trainer-details/add-trainer-training-dialog/add-trainer-training-dialog.component';
import {DateMaskModule} from '../core/date-mask/date-mask.module';
import {TimeMaskModule} from '../core/time-mask/time-mask.module';
import {SelectModule} from '../core/select/select.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {InviteTrainerDialogComponent} from './trainer-details/invite-trainer-dialog/invite-trainer-dialog.component';
import {MyDateAdapter} from '../core/my-date-adapter';
import {FormatDateModule} from '../core/format-date-pipe/format-date.module';
import {RedirectTrainerProfileResolver} from './trainer-details/redirect-trainer-profile.resolver';
import {FeedbackModule} from '../shared/feedback/feedback.module';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    TrainersRoutingModule,
    NumberOnlyModule,
    MatDialogModule,
    DateMaskModule,
    MatNativeDateModule,
    TimeMaskModule,
    MatDatepickerModule,
    SelectModule,
    FeedbackModule,
    FormatDateModule
  ],
  entryComponents: [
    InviteTrainerDialogComponent,
    AddTrainerTrainingDialogComponent
  ],
  declarations: [
    TrainerListComponent,
    TrainerDetailsComponent,
    InviteTrainerDialogComponent,
    AddTrainerTrainingDialogComponent,
    AppointmentComponent
  ],
  providers: [
    {provide: DateAdapter, useClass: MyDateAdapter},
    RedirectTrainerProfileResolver
  ]
})
export class TrainersModule {
}
