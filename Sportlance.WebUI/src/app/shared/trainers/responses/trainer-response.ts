import {SportResponse} from './sport-response';
import {TrainerStatus} from '../trainer-status';

export interface TrainerResponse {
  id: number;
  firstName: string;
  secondName: string;
  city: string;
  country: string;
  price: number;
  score: number;
  title: string;
  feedbacksCount: number;
  trainingsCount: number;
  photoUrl: string;
  about: string;
  status: TrainerStatus;
  skills: Array<SportResponse>;
  backgroundUrl: string;
}
