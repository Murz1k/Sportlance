import {NgModule} from '@angular/core';
import {TrainersRoutingModule} from './trainers-routing.module';
import {TrainerListComponent} from './trainer-list/trainer-list.component';
import {TrainerDetailsComponent} from './trainer-details/trainer-details.component';
import {CommonModule} from '@angular/common';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppointmentComponent} from './appointment/appointment.component';
import {NumberOnlyModule} from '../shared/number-only/number-only.module';
import {DateAdapter, MatDialogModule, MatNativeDateModule} from '@angular/material';
import {AddTrainerTrainingDialogComponent} from './trainer-details/add-trainer-training-dialog/add-trainer-training-dialog.component';
import {DateMaskModule} from '../shared/date-mask/date-mask.module';
import {TimeMaskModule} from '../shared/time-mask/time-mask.module';
import {SlSelectModule} from '../shared/select/select.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {InviteTrainerDialogComponent} from './trainer-details/invite-trainer-dialog/invite-trainer-dialog.component';
import {MyDateAdapter} from '../core/my-date-adapter';
import {FormatDateModule} from '../shared/format-date-pipe/format-date.module';
import {RedirectTrainerProfileResolver} from './trainer-details/redirect-trainer-profile.resolver';
import {TrainerFeedbackModule} from './trainer-details/trainer-feedbacks/trainer-feedback.module';
import {SlInputModule} from '../shared/input/input.module';
import {TrainersAboutComponent} from './trainers-about/trainers-about.component';
import {SlSelectCityModule} from '../shared/select-city/select-city.module';
import {SlButtonModule} from '../shared/button/button.module';
import {TeamsService} from '../teams/teams.service';
import {SlSpinnerModule} from '../shared/spinner/spinner.module';
import {TrainerSkillsCollectionModule} from './trainer-details/trainer-skills-collection/trainer-skills-collection.module';
import {TrainerWorkExperienceModule} from './trainer-details/trainer-work-experience/trainer-work-experience.module';

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

    SlSelectModule,
    SlButtonModule,
    SlInputModule,
    SlSpinnerModule,

    SlSelectCityModule,

    TrainerSkillsCollectionModule,
    TrainerWorkExperienceModule,

    TrainerFeedbackModule,
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
    AppointmentComponent,
    TrainersAboutComponent
  ],
  providers: [
    {provide: DateAdapter, useClass: MyDateAdapter},

    TeamsService,
    RedirectTrainerProfileResolver
  ]
})
export class TrainersModule {
}
