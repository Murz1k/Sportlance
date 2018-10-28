import {SportResponse} from '../../../shared/trainers/responses/sport-response';

export interface AddTrainerTrainingDialogData {
  trainerId: number;
  sports: SportResponse[];
}
