import {Component, OnInit} from '@angular/core';
import {TrainerInfo} from './trainer-info';
import {Star} from './star';
import {isNullOrUndefined} from 'util';
import {Paths} from '../../core/paths';
import {TrainersService} from '../trainers.service';
import {GetTrainersQuery} from '../../shared/trainers/get-trainers-query';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs/internal/Subscription';
import {AuthService} from '../../core/auth/auth.service';
import {Meta} from '@angular/platform-browser';

const checkNumber = (param) => param === null || param === undefined || param === '' || param === 0 ? null : +param;
const checkString = (param) => param === null || param === undefined || param === '' ? null : '' + param;


@Component({
  selector: 'sl-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.scss']
})
export class TrainerListComponent implements OnInit {

  starsNumber = 5;
  trainers: Array<TrainerInfo> = [];
  isRendering = true;
  isLoading = false;
  public showInfinityScroll: boolean;
  public isAuthorized = false;
  public Paths = Paths;

  public search: string;
  public country: string;
  public city: string;

  public minPrice?: number;
  public maxPrice?: number;

  public offset = 0;
  public count = 10;
  public totalCount = 100;

  public minFeedbacksCount?: number;
  public maxFeedbacksCount?: number;

  public workExperience: number;

  public subscription: Subscription;

  options = [];

  constructor(private meta: Meta,
              private router: Router,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private trainerService: TrainersService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(`Тренеры | Sportlance`);

    this.options = [
      {label: 'Меньше года', value: 1, from: 0, to: 1},
      {label: '1 - 3 года', value: 2, from: 1, to: 3},
      {label: '3 - 6 лет', value: 3, from: 3, to: 6},
      {label: 'более 6 лет', value: 4, from: 6}
    ];

    // this.meta.addTags([
    //   {name: 'description', content: 'Поиск тренеров Sportlance - Поиск тренеров, запись на тренировку'},
    //   {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    //   {name: 'robots', content: 'INDEX, FOLLOW'},
    //   {name: 'author', content: 'ABCD'},
    //   {name: 'keywords', content: 'TypeScript, Angular'},
    //   {name: 'date', content: '2018-06-02', scheme: 'YYYY-MM-DD'},
    //   {httpEquiv: 'Content-Type', content: 'text/html'},
    //   {property: 'og:title', content: 'My Text'},
    //   {property: 'og:type', content: 'website'},
    //   {charset: 'UTF-8'}
    // ]);

    this.meta.updateTag({name: 'description', content: 'Поиск тренеров Sportlance - Поиск тренеров, запись на тренировку'});
    this.meta.updateTag({name: 'og:description', content: 'Поиск тренеров Sportlance - Поиск тренеров, запись на тренировку'});
    this.meta.updateTag({name: 'og:title', content: 'Поиск тренеров Sportlance - Поиск тренеров, запись на тренировку'});

    this.isAuthorized = this.authService.isAuthorized;
    this.activatedRoute.queryParams.subscribe(async (params: Params) => {
      this.search = params['q'];
      this.country = params['country'];
      this.city = params['city'];
      this.minPrice = params['minPrice'];
      this.maxPrice = params['maxPrice'];
      this.minFeedbacksCount = params['minFeedbacksCount'];
      this.maxFeedbacksCount = params['maxFeedbacksCount'];
      this.workExperience = +params['workExperience'];

      this.updateData();
    });
  }

  public onScrollDown() {
    if (this.offset + this.count >= this.totalCount) {
      return;
    }
    this.showInfinityScroll = true;
    this.offset = this.count + this.offset;
    this.subscription = this.trainerService.get(<GetTrainersQuery>{
      search: this.search,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      offset: this.offset,
      count: this.count,
      city: this.city,
      country: this.country,
      feedbacksMinCount: this.minFeedbacksCount,
      feedbacksMaxCount: this.maxFeedbacksCount,
      workExperienceFrom: this.workExperience ? this.options.find(i => i.value === this.workExperience).from : undefined,
      workExperienceTo: this.workExperience ? this.options.find(i => i.value === this.workExperience).to : undefined
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
        skills: i.skills,
        photoUrl: i.photoUrl,
        about: this.cutAbout(i.about)
      }).forEach(item => this.trainers.push(item));
      this.totalCount = response.totalCount;
      this.showInfinityScroll = false;
    });
  }

  updateData() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.offset = 0;
    }
    this.isLoading = true;
    this.subscription = this.trainerService.get(<GetTrainersQuery>{
      search: this.search,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      offset: this.offset,
      count: this.count,
      country: this.country,
      city: this.city,
      feedbacksMinCount: this.minFeedbacksCount,
      feedbacksMaxCount: this.maxFeedbacksCount,
      workExperienceFrom: this.workExperience ? this.options.find(i => i.value === this.workExperience).from : undefined,
      workExperienceTo: this.workExperience ? this.options.find(i => i.value === this.workExperience).to : undefined
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
          skills: i.skills,
          photoUrl: i.photoUrl,
          about: this.cutAbout(i.about)
        });
        this.offset = response.offset;
        this.totalCount = response.totalCount;
        this.isLoading = false;
        this.isRendering = false;
      }
    });
  }

  changeParams() {
    this.router.navigate([Paths.Trainers], {
      queryParams: {
        q: checkString(this.search),
        country: checkString(this.country),
        city: checkString(this.city),
        minPrice: checkNumber(this.minPrice),
        maxPrice: checkNumber(this.maxPrice),
        minFeedbacksCount: checkNumber(this.minFeedbacksCount),
        maxFeedbacksCount: checkNumber(this.maxFeedbacksCount),
        workExperience: checkNumber(this.workExperience),
      }
    });
  }

  openProfile(trainerId: number) {
    if (!isNullOrUndefined(trainerId)) {
      this.router.navigate([`${Paths.Trainers}/${trainerId}`]);
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
    if (!score) {
      for (let i = 0; i < 5; i++) {
        allStars.push(<Star>{isEmpty: true});
      }
      return allStars;
    }
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
    if (!feedbacksCount) {
      return 'Нет отзывов';
    }
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

  reset() {
    this.search = undefined;
    this.country = undefined;
    this.city = undefined;
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.minFeedbacksCount = undefined;
    this.maxFeedbacksCount = undefined;
    this.workExperience = undefined;

    this.changeParams();
  }
}
