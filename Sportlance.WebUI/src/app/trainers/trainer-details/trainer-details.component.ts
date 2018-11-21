import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Star} from '../trainer-list/star';
import {TrainerInfo} from '../trainer-list/trainer-info';
import {TrainersService} from '../trainers.service';
import {User} from '../../services/user.service/user';
import {InviteTrainerDialogData} from './invite-trainer-dialog/invite-trainer-dialog-data';
import {InviteTrainerDialogComponent} from './invite-trainer-dialog/invite-trainer-dialog.component';
import {MatDialog} from '@angular/material';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-trainer-details',
  templateUrl: './trainer-details.component.html',
  styleUrls: ['./trainer-details.component.scss']
})
export class TrainerDetailsComponent implements OnInit {

  trainer: TrainerInfo;
  starsNumber = 5;
  trainerId: number;
  public account: User;
  public canInvited = false;
  public isShowAbout = false;

  public teams = [];

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private trainerService: TrainersService) {
  }

  async ngOnInit() {
    this.account = this.authService.getCurrent();
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
    this.trainerId = this.route.snapshot.params['id'];
    if (this.account && this.account.isTeam) {
      this.trainerService.canInviteTrainer(this.trainerId).subscribe((canInvited) => {
        this.canInvited = canInvited;
      });
    }
  }

  public showAbout() {
    this.isShowAbout = !this.isShowAbout;
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
