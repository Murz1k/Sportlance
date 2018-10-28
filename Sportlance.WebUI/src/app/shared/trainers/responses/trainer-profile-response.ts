import {ReviewInfoResponse} from '../../../services/feedbacks/responses/review-info-response';
import {SportResponse} from './sport-response';
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
  trainingsCount: number;
  sports: Array<SportResponse>;
  photoUrl: string;
  backgroundUrl: string;
}
