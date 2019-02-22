import {Component, Input, OnInit} from '@angular/core';
import {ReviewInfo} from '../review-info';
import {Star} from '../../trainer-list/star';
import {FeedbacksService} from '../../../shared/feedbacks/feedbacks.service';
import {TrainerResponse} from '../../../shared/trainers/responses/trainer-response';
import {AuthService} from '../../../core/auth/auth.service';

@Component({
  selector: 'sl-trainer-feedback',
  templateUrl: './trainer-feedback.component.html',
  styleUrls: ['./trainer-feedback.component.scss']
})
export class TrainerFeedbackComponent implements OnInit {

  @Input() trainer: TrainerResponse;

  private offset = 0;
  private count = 10;
  private totalCount = 0;

  starsNumber = 5;

  public feedbacks: Array<ReviewInfo> = [];
  public finished = false;
  isLoading = true;

  constructor(public authService: AuthService,
              private feedbackService: FeedbacksService) {
  }

  ngOnInit() {
    this.authService.setPermissions(`trainer:feedback:edit:${this.trainer.id}`, this.authService.isCurrentUser(this.trainer.id));
    this.updateFeedbacks(this.trainer.id);
  }

  private updateFeedbacks(trainerId: number) {
    this.isLoading = true;
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
        this.isLoading = false;
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
    this.feedbackService.getTrainerFeedbacks(this.trainer.id, this.offset, this.count)
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
