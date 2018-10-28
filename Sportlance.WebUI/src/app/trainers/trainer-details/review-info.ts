import {Star} from '../trainer-list/star';

export interface ReviewInfo {
  photoUrl: string;
  clientName: string;
  stars: Array<Star>;
  description: string;
  createDate: Date;
}
