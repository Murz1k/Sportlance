import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeedbackComponent} from './feedback.component';
import {FormatDateModule} from '../format-date-pipe/format-date.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    FormatDateModule
  ],
  declarations: [FeedbackComponent],
  exports: [FeedbackComponent]
})
export class FeedbackModule {
}
