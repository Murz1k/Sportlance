import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainerWorkExperienceComponent} from './trainer-work-experience.component';
import {SlButtonModule} from '../../../shared/button/button.module';
import {FormatDateModule} from '../../../shared/format-date-pipe/format-date.module';
import {TrainerWorkDatePipe} from './trainer-work-date-pipe/trainer-work-date.pipe';

@NgModule({
  declarations: [TrainerWorkExperienceComponent, TrainerWorkDatePipe],
  imports: [
    CommonModule,
    SlButtonModule,
    FormatDateModule
  ],
  exports: [TrainerWorkExperienceComponent, TrainerWorkDatePipe]
})
export class TrainerWorkExperienceModule {
}
