import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainerFeedbackComponent} from './trainer-feedback.component';
import {FormatDateModule} from '../../../shared/format-date-pipe/format-date.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    FormatDateModule
  ],
  declarations: [TrainerFeedbackComponent],
  exports: [TrainerFeedbackComponent]
})
export class TrainerFeedbackModule {
}
