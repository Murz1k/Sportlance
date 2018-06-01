import {Component, OnInit} from '@angular/core';
import {TrainerInfo} from './trainer-info';
import {Star} from './star';
import {isNullOrUndefined} from 'util';
import {Paths} from '../../paths';
import {TrainersService} from '../../services/trainers.service/trainers.service';
import {AccountService} from '../../services/account-service';
import {GetTrainersQuery} from '../../services/trainers.service/get-trainers-query';
import {Router} from '@angular/router';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss']
})
export class TrainersComponent implements OnInit {

  starsNumber = 5;
  trainers: Array<TrainerInfo> = [];
  isRendering = false;
  filtersIsHidden = true;
  public isAuthorized = false;
  public priceFilters = [];

  public searchString: string;

  constructor(private router: Router,
              private accountService: AccountService,
              private trainerService: TrainersService) {

    this.priceFilters = [
      {id: 0, costs: {min: 0, max: 500}},
      {id: 1, costs: {min: 500, max: 1000}},
      {id: 2, costs: {min: 1000, max: 5000}},
      {id: 3, costs: {min: 5000, max: 10000}},
      {id: 4, costs: {min: 10000, max: 9999999}}
    ];
  }

  async updateDataAsync() {
    this.isRendering = false;
    const response = await this.trainerService.getAsync(<GetTrainersQuery>{
      searchString: this.searchString
    });
    if (response.items) {
      this.trainers = response.items.map(i => <TrainerInfo>{
        id: i.id,
        city: i.city,
        country: i.country,
        price: i.price,
        secondName: i.secondName,
        firstName: i.firstName,
        stars: this.convertAverageScoreToStars(i.score),
        title: i.title,
        reviewTitle: this.convertReviewsToReviewTitle(i.feedbacksCount),
        trainingsCount: i.trainingsCount,
        trainingsTitle: this.convertTrainingsToTrainingTitle(i.trainingsCount)
      });
    }

    this.isAuthorized = this.accountService.isAuthorized;

    this.isRendering = true;
  }

  ckechKeyDownSearch(e): void {
    if (e.keyCode === 13) {
      this.searchAsync();
    }
  }

  public showFilters(): void {
    this.filtersIsHidden = !this.filtersIsHidden;
  }

  public async searchAsync(): Promise<void> {
    await this.updateDataAsync();
  }

  async ngOnInit() {
    await this.updateDataAsync();
  }

  async openProfileAsync(trainerId: number) {
    if (!isNullOrUndefined(trainerId)) {
      await this.router.navigate([`${Paths.Profile}/${trainerId}`]);
    }
  }

  login() {
    this.router.navigate([Paths.Login]);
  }

  private convertAverageScoreToStars(score: number): Array<Star> {
    const allStars = [];
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

  private convertTrainingsToTrainingTitle(trainings: number): string {
    let title = 'трениров';
    const lastOneNumber = +trainings.toString().slice(-1);
    const lastTwoNumbers = +trainings.toString().slice(-2);
    if (lastOneNumber === 1) {
      title = `${title}ка`;
    } else if (lastOneNumber === 0 || lastTwoNumbers === 0 || lastOneNumber >= 5 || lastTwoNumbers <= 20) {
      title = `${title}ок`;
    } else {
      title = `${title}ки`;
    }
    return title;
  }

  private convertReviewsToReviewTitle(feedbacksCount: number): string {
    let title = 'отзыв';
    const reviewCount = isNullOrUndefined(feedbacksCount) ? 0 : feedbacksCount;
    const lastOneNumber = +reviewCount.toString().slice(-1);
    const lastTwoNumbers = +reviewCount.toString().slice(-2);
    if (lastOneNumber === 0 || lastTwoNumbers === 0 || lastOneNumber >= 5 || lastTwoNumbers <= 20) {
      title = `${reviewCount} ${title}ов`;
    } else if (lastOneNumber === 1) {
      title = `${reviewCount} ${title}`;
    } else {
      title = `${reviewCount} ${title}а`;
    }
    return title;
  }
}
