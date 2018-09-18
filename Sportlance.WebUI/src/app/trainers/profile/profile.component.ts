import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Star} from '../trainers/star';
import {TrainerInfo} from '../trainers/trainer-info';
import {TrainersService} from '../../services/trainers/trainers.service';
import {ReviewInfo} from './review-info';
import {FeedbacksService} from '../../services/feedbacks/feedbacks.service';
import {UserService} from '../../services/user.service/user.service';
import {User} from '../../services/user.service/user';
import {InviteTrainerDialogData} from '../invite-trainer-dialog/invite-trainer-dialog-data';
import {InviteTrainerDialogComponent} from '../invite-trainer-dialog/invite-trainer-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  trainer: TrainerInfo;
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
  public finished = false;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private feedbackService: FeedbacksService,
              private trainerService: TrainersService) {
  }

  async ngOnInit() {
    this.account = this.userService.getCurrent();
    this.trainer = <TrainerInfo>{
      firstName: this.route.snapshot.data['profile'].firstName,
      secondName: this.route.snapshot.data['profile'].secondName,
      trainingsCount: this.route.snapshot.data['profile'].trainingsCount,
      price: this.route.snapshot.data['profile'].price,
      city: this.route.snapshot.data['profile'].city,
      about: this.route.snapshot.data['profile'].about,
      title: this.route.snapshot.data['profile'].title,
      country: this.route.snapshot.data['profile'].country,
      stars: this.convertAverageScoreToStars(this.route.snapshot.data['profile'].score),
      sports: this.route.snapshot.data['profile'].sports
    };
    await this.route.params.forEach(async params => {
      this.trainerId = params['id'];
      this.updateFeedbacks(this.trainerId);
      if (this.account && this.account.isTeam) {
        this.trainerService.canInviteTrainer(params['id']).subscribe((canInvited) => {
          this.canInvited = canInvited;
        });
      }
    });
  }

  public showAbout() {
    this.isShowAbout = !this.isShowAbout;
  }

  private updateFeedbacks(trainerId: number) {
    this.feedbackService.getTrainerFeedbacks(trainerId, this.offset, this.count)
      .subscribe((response) => {
        this.totalCount = response.totalCount;
        response.items.map(i => <ReviewInfo>{
          stars: this.convertAverageScoreToStars(i.score),
          clientName: i.clientName,
          createDate: i.createDate,
          description: i.description,
          photoUrl: i.photoUrl
        }).forEach(item => this.feedbacks.push(item));
      });
  }

  public onScrollDown() {
    if (this.finished) {
      return;
    }
    this.offset = this.count + this.offset;
    this.feedbackService.getTrainerFeedbacks(this.trainerId, this.offset, this.count)
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
    this.dialog.open(InviteTrainerDialogComponent, {data: <InviteTrainerDialogData>{trainerId: this.trainerId}})
      .afterClosed()
      .subscribe();
  }
}
