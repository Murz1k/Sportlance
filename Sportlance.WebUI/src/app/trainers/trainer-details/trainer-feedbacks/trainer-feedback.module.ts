import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainerFeedbackComponent} from './trainer-feedback.component';
import {FormatDateModule} from '../../../shared/format-date-pipe/format-date.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {SlSpinnerModule} from '../../../shared/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    SlSpinnerModule,
    FormatDateModule
  ],
  declarations: [TrainerFeedbackComponent],
  exports: [TrainerFeedbackComponent]
})
export class TrainerFeedbackModule {
}
