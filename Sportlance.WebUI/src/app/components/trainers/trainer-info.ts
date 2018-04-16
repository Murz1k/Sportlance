import {Star} from './star';
import {ReviewInfo} from '../profile/review-info';

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
}
