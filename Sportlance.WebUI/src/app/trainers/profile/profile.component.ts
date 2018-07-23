import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Star} from '../trainers/star';
import {TrainerInfo} from '../trainers/trainer-info';
import {TrainersService} from '../../services/trainers/trainers.service';
import {ReviewInfo} from './review-info';
import {FeedbacksService} from '../../services/feedbacks/feedbacks.service';
import {UserService} from '../../services/user.service/user.service';
import {User} from '../../services/user.service/user';
import {DialogService} from '../../services/dialog.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  trainer: TrainerInfo;
  isRendering = false;
  starsNumber = 5;
  trainerId: number;
  public account: User;
  public canInvited = false;
  public isShowAbout = false;

  private offset = 0;
  private count = 10;
  private totalCount = 0;
  public feedbacks: Array<ReviewInfo> = [];
  public teams = [];

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private dialogService: DialogService,
              private feedbackService: FeedbacksService,
              private trainerService: TrainersService) {
    this.account = this.userService.getCurrent();
  }

  async ngOnInit() {
    await this.route.params.forEach(async params => {
      this.trainerId = params['id'];
      await Promise.all([this.updateDataAsync(this.trainerId), this.updateFeedbacksAsync(this.trainerId)]);
      if (this.account.isTeam) {
        this.trainerService.canInviteTrainer(params['id']).subscribe((canInvited) => {
          this.canInvited = canInvited;
        });
      }
    });
  }

  public showAbout() {
    this.isShowAbout = !this.isShowAbout;
  }

  private async updateFeedbacksAsync(trainerId: number) {
    const response = await this.feedbackService.getTrainerFeedbacksAsync(trainerId, this.offset, this.count);
    this.totalCount = response.totalCount;
    this.feedbacks = response.items.map(i => <ReviewInfo>{
      stars: this.convertAverageScoreToStars(i.score),
      clientName: i.clientName,
      createDate: i.createDate,
      description: i.description,
      photoUrl: i.photoUrl
    });
  }

  public async onScrollDownAsync() {
    if (this.offset + this.count >= this.totalCount) {
      return;
    }
    this.offset = this.count + this.offset;
    const response = await this.feedbackService.getTrainerFeedbacksAsync(this.trainerId, this.offset, this.count);
    this.totalCount = response.totalCount;
    response.items.map(i => <ReviewInfo>{
      stars: this.convertAverageScoreToStars(i.score),
      clientName: i.clientName,
      createDate: i.createDate,
      description: i.description,
      photoUrl: i.photoUrl
    }).forEach(item => this.feedbacks.push(item));
  }

  async updateDataAsync(id: number) {
    this.isRendering = false;
    const response = await this.trainerService.getByIdAsync(id);
    this.trainer = <TrainerInfo>{
      firstName: response.firstName,
      secondName: response.secondName,
      trainingsCount: response.trainingsCount,
      price: response.price,
      city: response.city,
      about: response.about,
      title: response.title,
      country: response.country,
      stars: this.convertAverageScoreToStars(response.score),
      sports: response.sports
    };
    this.isRendering = true;
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

  public invite() {
    this.dialogService.showInviteTrainerDialogAsync(this.trainerId);
  }
}
