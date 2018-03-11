import {Star} from "./star";

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
  reviewTitle: string;
  trainingsCount: number;
  trainingsTitle: string;
}
