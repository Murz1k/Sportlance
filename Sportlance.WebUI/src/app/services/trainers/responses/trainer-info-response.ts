import {SportResponse} from '../../sports/sport-response';

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
  sports: Array<SportResponse>;
}
