import {Component} from '@angular/core';
import {TrainerInfo} from './trainer-info';
import {Star} from './star';
import {isNullOrUndefined} from 'util';
import {Paths} from '../../core/paths';
import {TrainersService} from '../trainers.service';
import {GetTrainersQuery} from '../../shared/trainers/get-trainers-query';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs/internal/Subscription';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.scss']
})
export class TrainerListComponent {

  starsNumber = 5;
  trainers: Array<TrainerInfo> = [];
  isRendering = true;
  public isAuthorized = false;
  public Paths = Paths;
  public finished = false;

  public searchString: string;
  public country: string;
  public city: string;

  public minPrice?: number;
  public maxPrice?: number;

  public offset = 0;
  public count = 10;
  public totalCount = 100;

  public minFeedbacksCount?: number;
  public maxFeedbacksCount?: number;

  public subscription: Subscription;

  constructor(private router: Router,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private trainerService: TrainersService) {
    this.titleService.setTitle(`Тренеры | Sportlance`);

    this.isAuthorized = this.authService.isAuthorized;
    this.activatedRoute.queryParams.subscribe(async (params: Params) => {
      this.searchString = params['q'];
      this.country = params['country'];
      this.city = params['city'];
      this.minPrice = params['minPrice'];
      this.maxPrice = params['maxPrice'];
      this.minFeedbacksCount = params['minFeedbacksCount'];
      this.maxFeedbacksCount = params['maxFeedbacksCount'];

      this.updateData();
    });
  }

  public onScrollDown() {
    if (this.finished) {
      return;
    }
    this.offset = this.count + this.offset;
    this.subscription = this.trainerService.get(<GetTrainersQuery>{
      searchString: this.searchString,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      offset: this.offset,
      count: this.count,
      city: this.city,
      country: this.country,
      feedbacksMinCount: this.minFeedbacksCount,
      feedbacksMaxCount: this.maxFeedbacksCount
    }).subscribe(response => {
      response.items.map(i => <TrainerInfo>{
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
        trainingsTitle: this.convertTrainingsToTrainingTitle(i.trainingsCount),
        sports: i.sports,
        photoUrl: isNullOrUndefined(i.photo) ? null : `data:image/jpg;base64,${i.photo.data}`,
        about: this.cutAbout(i.about)
      }).forEach(item => this.trainers.push(item));
      this.totalCount = response.totalCount;
      this.finished = this.offset + this.count >= this.totalCount;
    });
  }

  updateData() {
    this.isRendering = true;
    if (this.subscription) {
      this.offset = 0;
    }
    this.subscription = this.trainerService.get(<GetTrainersQuery>{
      searchString: this.searchString,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      offset: this.offset,
      count: this.count,
      country: this.country,
      city: this.city,
      feedbacksMinCount: this.minFeedbacksCount,
      feedbacksMaxCount: this.maxFeedbacksCount
    }).subscribe(response => {
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
          trainingsTitle: this.convertTrainingsToTrainingTitle(i.trainingsCount),
          sports: i.sports,
          photoUrl: isNullOrUndefined(i.photo) ? null : `data:image/jpg;base64,${i.photo.data}`,
          about: this.cutAbout(i.about)
        });
        this.offset = response.offset;
        this.totalCount = response.totalCount;

        this.isRendering = false;
      }
    });
  }

  changeParams() {
    const checkNumber = (param) => isNullOrUndefined(param) || param === '' || param === 0 ? null : +param;
    const checkString = (param) => isNullOrUndefined(param) || param === '' ? null : '' + param;
    this.router.navigate([Paths.Trainers], {
      queryParams: {
        q: checkString(this.searchString),
        country: checkString(this.country),
        city: checkString(this.city),
        minPrice: checkNumber(this.minPrice),
        maxPrice: checkNumber(this.maxPrice),
        minFeedbacksCount: checkNumber(this.minFeedbacksCount),
        maxFeedbacksCount: checkNumber(this.maxFeedbacksCount)
      }
    });
  }

  async openProfileAsync(trainerId: number) {
    if (!isNullOrUndefined(trainerId)) {
      await this.router.navigate([`${Paths.Trainers}/${trainerId}`]);
    }
  }

  login() {
    this.router.navigate([Paths.Login]);
  }

  private cutAbout(about: string): string {
    if (!about || about.length <= 167) {
      return about;
    }
    return about.substring(0, 167) + '...';
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
