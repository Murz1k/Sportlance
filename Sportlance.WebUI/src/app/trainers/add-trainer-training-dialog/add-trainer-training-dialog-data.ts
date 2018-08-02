import {SportResponse} from '../../services/trainers/responses/sport-response';

export interface AddTrainerTrainingDialogData {
  trainerId: number;
  sports: SportResponse[];
}
