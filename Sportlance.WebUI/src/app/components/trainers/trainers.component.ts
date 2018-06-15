import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {TrainerInfo} from './trainer-info';
import {Star} from './star';
import {isNullOrUndefined} from 'util';
import {Paths} from '../../core/paths';
import {TrainersService} from '../../services/trainers/trainers.service';
import {AccountService} from '../../services/account-service';
import {GetTrainersQuery} from '../../services/trainers/get-trainers-query';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatRadioChange} from '@angular/material';

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
  public feedbackFilters = [];

  public searchString: string;

  public minPrice?: number;
  public maxPrice?: number;

  public offset = 0;
  public count = 10;
  public totalCount = 100;
  public pagesCount = 0;
  public currentPage = 0;

  public pages: number[] = [];

  public minFeedbacksCount?: number;
  public maxFeedbacksCount?: number;

  constructor(private router: Router,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute,
              private trainerService: TrainersService,
              private location: Location) {

    this.isAuthorized = this.accountService.isAuthorized;
    // subscribe to router event
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.searchString = params['q'];
      this.minPrice = params['minPrice'];
      this.maxPrice = params['maxPrice'];
      this.currentPage = isNullOrUndefined(params['page']) ? 0 : +params['page'];
      this.offset = this.count * this.currentPage;
      this.minFeedbacksCount = params['minFeedbacksCount'];
      this.maxFeedbacksCount = params['maxFeedbacksCount'];
    });

    this.priceFilters = [
      {min: null, max: null, label: 'Любая стоимость'},
      {min: null, max: 500, label: '500Р и менее'},
      {min: 500, max: 1000, label: '500Р - 1000р'},
      {min: 1000, max: 5000, label: '1000Р - 5000р'},
      {min: 5000, max: 10000, label: '5000Р - 10000р'},
      {min: 10000, max: null, label: '10000Р и более'}
    ];

    this.feedbackFilters = [
      {min: null, max: null},
      {min: null, max: 10},
      {min: 10, max: 50},
      {min: 50, max: 100},
      {min: 100, max: null}
    ];
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.offset = this.count * page;
    this.updateDataAsync();
  }

  changePriceFilter(event: MatRadioChange) {
    if (isNullOrUndefined(event.value)) return;
    this.minPrice = this.priceFilters[event.value].min;
    this.maxPrice = this.priceFilters[event.value].max;
  }

  changeFeedbackFilter(event: MatRadioChange) {
    if (isNullOrUndefined(event.value)) return;
    this.minFeedbacksCount = this.feedbackFilters[event.value].min;
    this.maxFeedbacksCount = this.feedbackFilters[event.value].max;
  }

  async submitFiltersAsync() {
    this.offset = 0;
    console.log(this.location);
    await this.updateDataAsync();
    this.filtersIsHidden = true;
  }

  async updateDataAsync() {
    this.isRendering = false;
    const response = await this.trainerService.getAsync(<GetTrainersQuery>{
      searchString: this.searchString,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      offset: this.offset,
      count: this.count,
      feedbacksMinCount: this.minFeedbacksCount,
      feedbacksMaxCount: this.maxFeedbacksCount
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
      this.offset = response.offset;
      this.totalCount = response.totalCount;
      this.pagesCount = this.count === 0 ? 0 : Math.round(this.totalCount / this.count);

      this.pages = this.pagesCount < 6 ? Array(this.pagesCount).fill(0).map((x, i) => i) : [];

      this.router.navigate([Paths.Trainers], {
        queryParams: {
          q: this.searchString,
          minPrice: this.minPrice,
          maxPrice: this.maxPrice,
          page: this.currentPage,
          feedbacksMinCount: this.minFeedbacksCount,
          feedbacksMaxCount: this.maxFeedbacksCount
        }
      });
    }

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
    this.offset = 0;
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
}
