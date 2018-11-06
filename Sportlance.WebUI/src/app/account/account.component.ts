import {Component, OnInit} from '@angular/core';
import {User} from '../services/user.service/user';
import {TrainerInfo} from '../trainers/trainer-list/trainer-info';
import {TrainersService} from '../trainers/trainers.service';
import {Star} from '../trainers/trainer-list/star';
import {ReviewInfo} from '../trainers/trainer-details/review-info';
import {TrainerStatus} from '../shared/trainers/trainer-status';
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
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';

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

  public feedbacks: Observable<ReviewInfo[]>;

  constructor(private authService: AuthService,
              private titleService: Title,
              private dialog: MatDialog,
              private feedbackService: FeedbacksService,
              private trainerService: TrainersService) {
    this.account = this.authService.getCurrent();
    this.titleService.setTitle(`${this.account.firstName} ${this.account.secondName} | Sportlance`);
  }

  async ngOnInit() {
    if (this.account.isTrainer) {
      this.updateFeedbacks();
      this.updateData();
    }
  }

  private updateFeedbacks() {
    this.feedbacks = this.feedbackService.getSelfTrainerFeedbacks(this.offset, this.count)
      .pipe(map((response) => {
        return response.items.map(i => <ReviewInfo>{
          stars: this.convertAverageScoreToStars(i.score),
          clientName: i.clientName,
          createDate: i.createDate,
          description: i.description,
          photoUrl: i.photoUrl
        });
      }));
  }

  private updateData() {
    this.isRendering = false;
    this.trainerService.getSelf()
      .pipe(map((response) => {
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
      }));
  }

  public changeStatus(event: MatCheckboxChange) {
    if (this.trainer.status === TrainerStatus.Banned || this.trainer.status === TrainerStatus.Deleted) {
      return;
    }
    if (event.checked) {
      this.trainerService.setAvailability(true);
      this.trainer.status = TrainerStatus.Available;
    } else {
      this.trainerService.setAvailability(false);
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

  changeAbout() {
    this.dialog.open(EditTrainerAboutDialogComponent, {data: <EditTrainerAboutDialogData>{about: this.trainer.about}})
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.updateData();
        }
      });
  }

  changePaid() {
    this.dialog.open(EditTrainerPaidDialogComponent, {data: <EditTrainerPaidDialogData>{paid: this.trainer.price}})
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.updateData();
        }
      });
  }

  changePhoto() {
    this.dialog.open(EditPhotoDialogComponent, {data: <EditPhotoDialogData>{url: this.trainer.photoUrl}})
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.updateData();
        }
      });
  }

  changeBackground() {
    this.dialog.open(EditBackgroundDialogComponent, {data: <EditBackgroundDialogData>{url: this.trainer.backgroundUrl}})
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.updateData();
        }
      });
  }
}
