import {ReviewInfoResponse} from './review-info-response';
import {SportResponse} from '../../sports/sport-response';
import {TrainerStatus} from '../trainer-status';

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
  status: TrainerStatus;
  reviews: Array<ReviewInfoResponse>;
  trainingsCount: number;
  sports: Array<SportResponse>;
}
