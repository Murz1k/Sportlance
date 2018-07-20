import {Component, OnInit} from '@angular/core';
import {User} from '../services/user.service/user';
import {UserService} from '../services/user.service/user.service';
import {TrainerInfo} from '../trainers/trainers/trainer-info';
import {TrainersService} from '../services/trainers/trainers.service';
import {Star} from '../trainers/trainers/star';
import {ReviewInfo} from '../trainers/profile/review-info';
import {TrainerStatus} from '../services/trainers/trainer-status';
import {MatCheckboxChange} from '@angular/material';
import {Paths} from '../core/paths';
import {DialogService} from '../services/dialog.service';
import {isNullOrUndefined} from 'util';
import {SettingsLinks} from "./settings-links";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public account: User;
  public trainer: TrainerInfo;
  public isRendering = false;
  public Paths = Paths;
  public TrainerStatus = TrainerStatus;
  public SettingsLinks = SettingsLinks;
  public activeLink = SettingsLinks.ContactInfo;
  starsNumber = 5;

  constructor(private userService: UserService,
              private dialogService: DialogService,
              private trainerService: TrainersService) {
    this.account = this.userService.getCurrent();
  }

  async ngOnInit() {
    if (this.account.isTrainer) {
      await this.updateDataAsync();
    }
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
      photoUrl: response.photoUrl
    };
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

  private convertTrainingsToTrainingTitle(trainingsCount: number): string {
    let title = 'трениров';
    const lastOneNumber = +trainingsCount.toString().slice(-1);
    const lastTwoNumbers = +trainingsCount.toString().slice(-2);
    if (lastOneNumber === 1) {
      title = `${title}ка`;
    } else if (lastOneNumber === 0 || lastTwoNumbers === 0 || (lastOneNumber >= 5 && lastTwoNumbers <= 20)) {
      title = `${title}ок`;
    } else {
      title = `${title}ки`;
    }
    return title;
  }

  private convertReviewsToReviewTitle(feedbacksCount: number): string {
    let title = 'отзыв';
    const lastOneNumber = +feedbacksCount.toString().slice(-1);
    const lastTwoNumbers = +feedbacksCount.toString().slice(-2);
    if (lastOneNumber === 0 || lastTwoNumbers === 0 || (lastOneNumber >= 5 && lastTwoNumbers <= 20)) {
      title = `${feedbacksCount} ${title}ов`;
    } else if (lastOneNumber === 1) {
      title = `${feedbacksCount} ${title}`;
    } else {
      title = `${feedbacksCount} ${title}а`;
    }
    return title;
  }

  async changeAboutAsync() {
    await this.dialogService.showEditTrainerAboutDialogAsync(this.trainer.about);
    await this.updateDataAsync();
  }

  async changePaidAsync() {
    const result = await this.dialogService.showEditTrainerPaidDialogAsync(this.trainer.price);
    if (result) {
      await this.updateDataAsync();
    }
  }

  async changePhotoAsync() {
    const result = await this.dialogService.showEditPhotoDialogAsync(this.trainer.photoUrl);
    if (result) {
      await this.updateDataAsync();
    }
  }

  public changePage(link: SettingsLinks) {
    this.activeLink = link;
  }
}
