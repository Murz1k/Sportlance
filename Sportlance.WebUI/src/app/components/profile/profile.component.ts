import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Star} from '../trainers/star';
import {TrainerInfo} from '../trainers/trainer-info';
import {TrainersService} from '../../services/trainers.service/trainers.service';
import {ReviewInfo} from './review-info';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  trainer: TrainerInfo;
  isRendering = false;
  starsNumber = 5;

  constructor(private route: ActivatedRoute,
              private trainerService: TrainersService) {
  }

  async ngOnInit() {
    await this.route.params.forEach(async params => {
      await this.updateDataAsync(params['id']);
    });
  }

  async updateDataAsync(id: number) {
    this.isRendering = false;
    const response = await this.trainerService.getByIdAsync(id);
    this.trainer = <TrainerInfo>{
      reviews: response.reviews.map(i => <ReviewInfo>{
        stars: this.convertAverageScoreToStars(i.score),
        clientName: i.clientName,
        createDate: i.createDate,
        description: i.description,
        photoUrl: i.photoUrl
      }),
      firstName: response.firstName,
      secondName: response.secondName,
      trainingsCount: response.trainingsCount,
      price: response.price,
      city: response.city,
      about: response.about,
      title: response.title,
      country: response.country,
      stars: this.convertAverageScoreToStars(response.score)
    };
    this.isRendering = true;
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
}
