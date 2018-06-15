import {Star} from './star';
import {ReviewInfoResponse} from '../../services/trainers/responses/review-info-response';

export interface TrainerProfile {
  id: number;
  firstName: string;
  secondName: string;
  city: string;
  country: string;
  price: number;
  stars: Array<Star>;
  about: string;
  title: string;
  reviews: Array<ReviewInfoResponse>;
  reviewTitle: string;
  trainingsCount: number;
  trainingsTitle: string;
}
