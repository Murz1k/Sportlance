import {Review} from './review';

export interface Trainer {
  id: number;
  firstName: string;
  secondName: string;
  city: string;
  country: string;
  price: number;
  score: number;
  about: string;
  title: string;
  reviews: Array<Review>;
  trainingsCount: number;
}
