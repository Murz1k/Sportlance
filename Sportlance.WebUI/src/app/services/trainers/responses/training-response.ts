import {SportResponse} from './sport-response';

export interface TrainingResponse {
  id: number;
  clientId: number;
  sport: SportResponse;
  startDate: Date;
  endDate: Date;
  clientFirstName: string;
  clientLastName: string;
}
