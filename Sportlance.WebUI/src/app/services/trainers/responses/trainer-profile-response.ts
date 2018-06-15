import {ReviewInfoResponse} from './review-info-response';

export interface TrainerProfileResponse {
  id: number;
  firstName: string;
  secondName: string;
  city: string;
  country: string;
  price: number;
  score: number;
  about: string;
  title: string;
  reviews: Array<ReviewInfoResponse>;
  trainingsCount: number;
}
