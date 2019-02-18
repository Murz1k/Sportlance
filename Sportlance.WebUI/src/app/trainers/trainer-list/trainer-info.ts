import {Star} from './star';
import {ReviewInfo} from '../trainer-details/review-info';
import {SportResponse} from '../../shared/trainers/responses/sport-response';
import {TrainerStatus} from '../../shared/trainers/trainer-status';

export interface TrainerInfo {
  id: number;
  firstName: string;
  secondName: string;
  city: string;
  country: string;
  price: number;
  stars: Array<Star>;
  about: string;
  title: string;
  reviews: Array<ReviewInfo>;
  reviewTitle: string;
  trainingsCount: number;
  trainingsTitle: string;
  skills: Array<SportResponse>;
  status: TrainerStatus;
  photoUrl: string;
  backgroundUrl: string;
}
