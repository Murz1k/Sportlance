import {Component, OnInit} from '@angular/core';
import {User} from '../services/user.service/user';
import {UserService} from '../services/user.service/user.service';
import {TrainerInfo} from '../trainers/trainers/trainer-info';
import {TrainersService} from '../services/trainers/trainers.service';
import {Star} from '../trainers/trainers/star';
import {ReviewInfo} from '../trainers/profile/review-info';
import {TrainerStatus} from '../services/trainers/trainer-status';
import {MatCheckboxChange, MatDialog} from '@angular/material';
import {Paths} from '../core/paths';
import {Title} from '@angular/platform-browser';
import {isNullOrUndefined} from 'util';
import {FeedbacksService} from '../services/feedbacks/feedbacks.service';
import {EditTrainerAboutDialogComponent} from './edit-trainer-about-dialog/edit-trainer-about-dialog.component';
import {EditTrainerAboutDialogData} from './edit-trainer-about-dialog/edit-trainer-about-dialog-data';
import {EditTrainerPaidDialogComponent} from './edit-trainer-paid-dialog/edit-trainer-paid-dialog.component';
import {EditTrainerPaidDialogData} from './edit-trainer-paid-dialog/edit-trainer-paid-dialog-data';
import {EditPhotoDialogData} from './edit-photo-dialog/edit-photo-dialog-data';
import {EditPhotoDialogComponent} from './edit-photo-dialog/edit-photo-dialog.component';
import {EditBackgroundDialogComponent} from './edit-background-dialog/edit-background-dialog.component';
import {EditBackgroundDialogData} from './edit-background-dialog/edit-background-dialog-data';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public account: User;
  public trainer: TrainerInfo;
  public isRendering = false;
  public Paths = Paths;
  public TrainerStatus = TrainerStatus;
  starsNumber = 5;
  public clubs = [];
  public isTrainer = false;

  private offset = 0;
  private count = 10;

  public feedbacks: Array<ReviewInfo> = [];

  constructor(private userService: UserService,
              private titleService: Title,
              private dialog: MatDialog,
              private feedbackService: FeedbacksService,
              private trainerService: TrainersService) {
    this.account = this.userService.getCurrent();
    this.titleService.setTitle(`${this.account.firstName} ${this.account.secondName} | Sportlance`);
  }

  async ngOnInit() {
    if (this.account.isTrainer) {
      await Promise.all([this.updateFeedbacksAsync, this.updateDataAsync]);
    }
  }

  private async updateFeedbacksAsync() {
    const response = await this.feedbackService.getSelfTrainerFeedbacksAsync(this.offset, this.count);
    this.feedbacks = response.items.map(i => <ReviewInfo>{
      stars: this.convertAverageScoreToStars(i.score),
      clientName: i.clientName,
      createDate: i.createDate,
      description: i.description,
      photoUrl: i.photoUrl
    });
  }

  private async updateDataAsync() {
    this.isRendering = false;
    const response = await this.trainerService.getSelfAsync();
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
      sports: response.sports,
      status: response.status,
      id: response.id,
      photoUrl: response.photoUrl,
      backgroundUrl: response.backgroundUrl
    };
    this.isTrainer = this.account.isTrainer && !isNullOrUndefined(this.trainer);

    this.isRendering = true;
  }

  public async changeStatusAsync(event: MatCheckboxChange) {
    if (this.trainer.status === TrainerStatus.Banned || this.trainer.status === TrainerStatus.Deleted) {
      return;
    }
    if (event.checked) {
      await this.trainerService.setAvailabilityAsync(true);
      this.trainer.status = TrainerStatus.Available;
    } else {
      await this.trainerService.setAvailabilityAsync(false);
      this.trainer.status = TrainerStatus.NotAvailable;
    }
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

  async changeAboutAsync() {
    this.dialog.open(EditTrainerAboutDialogComponent, {data: <EditTrainerAboutDialogData>{about: this.trainer.about}})
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.updateDataAsync();
        }
      });
  }

  async changePaidAsync() {
    this.dialog.open(EditTrainerPaidDialogComponent, {data: <EditTrainerPaidDialogData>{paid: this.trainer.price}})
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.updateDataAsync();
        }
      });
  }

  async changePhotoAsync() {
    this.dialog.open(EditPhotoDialogComponent, {data: <EditPhotoDialogData>{url: this.trainer.photoUrl}})
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.updateDataAsync();
        }
      });
  }

  async changeBackgroundAsync() {
    this.dialog.open(EditBackgroundDialogComponent, {data: <EditBackgroundDialogData>{url: this.trainer.backgroundUrl}})
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.updateDataAsync();
        }
      });
  }
}
