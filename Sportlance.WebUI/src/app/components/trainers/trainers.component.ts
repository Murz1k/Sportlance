import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TrainerInfo} from './trainer-info';
import {Star} from './star';
import {TrainerService} from '../../services/trainer.service';
import {SportService} from '../../services/sport.service';
import {Sport} from '../../services/sport';
import {isNullOrUndefined} from 'util';
import {Paths} from '../../paths';
import {Review} from "../../services/review";

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {

  currentSport: Sport;
  starsNumber = 5;
  trainers: Array<TrainerInfo> = [];
  isRendering = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private trainerService: TrainerService,
              private sportService: SportService) {
  }

  async updateDataAsync(id: number) {
    this.isRendering = false;
    this.currentSport = await this.sportService.getByIdAsync(id);
    const response = await this.trainerService.getTrainersBySportIdAsync(this.currentSport.id);
    this.trainers = response.items.map(i => <TrainerInfo>{
      id: i.id,
      city: i.city,
      country: i.country,
      price: i.price,
      secondName: i.secondName,
      firstName: i.firstName,
      stars: this.convertAverageScoreToStars(i.score),
      about: this.cutAbout(i.about),
      title: i.title,
      reviewTitle: this.convertReviewsToReviewTitle(i.reviews),
      trainingsCount: i.trainingsCount,
      trainingsTitle: this.convertTrainingsToTrainingTitle(i.trainingsCount)
    });
    this.isRendering = true;
  }

  async ngOnInit() {
    await this.route.params.forEach(async params => {
      await this.updateDataAsync(params['id']);
    });
  }

  async openProfileAsync(trainerId: number) {
    if (!isNullOrUndefined(trainerId)) {
      await this.router.navigate([`${Paths.Profile}/${trainerId}`]);
    }
  }

  private cutAbout(about: string): string {
    if (isNullOrUndefined(about)) return '';
    return about.substr(0, 160) + '...';
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
    if (lastOneNumber === 0 || lastTwoNumbers === 0 || lastOneNumber >= 5 || lastTwoNumbers <= 20) {
      title = `${title}ок`;
    } else if (lastOneNumber === 1) {
      title = `${title}ка`;
    } else {
      title = `${title}ки`;
    }
    return title;
  }

  private convertReviewsToReviewTitle(reviews: Review[]): string {
    let title = 'отзыв';
    const reviewCount = isNullOrUndefined(reviews) ? 0 : reviews.length;
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
