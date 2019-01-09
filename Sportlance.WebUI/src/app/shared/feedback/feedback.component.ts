import {Component, Input, OnInit} from '@angular/core';
import {ReviewInfo} from '../../trainers/trainer-details/review-info';
import {Star} from '../../trainers/trainer-list/star';
import {FeedbacksService} from '../feedbacks/feedbacks.service';

@Component({
  selector: 'sl-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  @Input() objectId: number;

  private offset = 0;
  private count = 10;
  private totalCount = 0;

  starsNumber = 5;

  public feedbacks: Array<ReviewInfo> = [];
  public finished = false;

  constructor(private feedbackService: FeedbacksService) {
  }

  ngOnInit() {
    this.updateFeedbacks(this.objectId);
  }

  private updateFeedbacks(trainerId: number) {
    this.feedbackService.getTrainerFeedbacks(trainerId, this.offset, this.count)
      .subscribe((response) => {
        if (!response.error) {
          this.totalCount = response.totalCount;
          response.items.map(i => <ReviewInfo>{
            stars: this.convertAverageScoreToStars(i.score),
            clientName: i.clientName,
            createDate: i.createDate,
            description: i.description,
            photoUrl: i.photoUrl
          }).forEach(item => this.feedbacks.push(item));
        }
      });
  }

  private convertAverageScoreToStars(score: number): Array<Star> {
    const allStars = [];
    if (score > 4.5) {
      for (let i = 0; i < 5; i++) {
        allStars.push(<Star>{isFull: true});
      }
      return allStars;
    }
    if (score < 0.5) {
      for (let i = 0; i < 5; i++) {
        allStars.push(<Star>{isEmpty: true});
      }
      return allStars;
    }
    const fillStars = Math.trunc(score);
    for (let i = 0; i < fillStars; i++) {
      allStars.push(<Star>{isFull: true});
    }
    const halfStars = Number.isInteger(score) ? 0 : 1;
    for (let i = 0; i < halfStars; i++) {
      allStars.push(<Star>{isHalf: true});
    }
    const emptyStars = this.starsNumber - fillStars - halfStars;
    for (let i = 0; i < emptyStars; i++) {
      allStars.push(<Star>{isEmpty: true});
    }
    return allStars;
  }

  public onScrollDown() {
    if (this.finished) {
      return;
    }
    this.offset = this.count + this.offset;
    this.feedbackService.getTrainerFeedbacks(this.objectId, this.offset, this.count)
      .subscribe((response) => {
        this.totalCount = response.totalCount;
        this.finished = this.offset + this.count >= this.totalCount;
        response.items.map(i => <ReviewInfo>{
          stars: this.convertAverageScoreToStars(i.score),
          clientName: i.clientName,
          createDate: i.createDate,
          description: i.description,
          photoUrl: i.photoUrl
        }).forEach(item => this.feedbacks.push(item));
      });
  }
}
