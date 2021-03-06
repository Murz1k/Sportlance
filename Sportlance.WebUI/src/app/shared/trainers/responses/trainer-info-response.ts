import {SportResponse} from './sport-response';

export interface TrainerInfoResponse {
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
  sports: Array<SportResponse>;
}
