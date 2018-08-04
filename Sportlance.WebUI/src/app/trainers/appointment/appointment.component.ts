import {Component, OnInit} from '@angular/core';
import {TrainersService} from '../../services/trainers/trainers.service';
import {ActivatedRoute} from '@angular/router';
import {TrainerProfileResponse} from '../../services/trainers/responses/trainer-profile-response';
import {SchedulerItem} from './scheduler-item';
import {isNullOrUndefined} from 'util';
import {MatDialog} from '@angular/material';
import {AddTrainerTrainingDialogComponent} from '../add-trainer-training-dialog/add-trainer-training-dialog.component';
import {AddTrainerTrainingDialogData} from '../add-trainer-training-dialog/add-trainer-training-dialog-data';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  public trainings: SchedulerItem[] = [];
  public trainer: TrainerProfileResponse;

  constructor(private route: ActivatedRoute,
              private trainerService: TrainersService,
              private dialog: MatDialog) {
    // this.trainings = [
    //   {label: 'Бокс', text: 'Ведет Тимофей в зале 8', from: '2018-07-26T14:30:00Z', to: '2018-07-26T15:30:00Z'},
    //   {label: 'Плавание', text: 'Ведет Леша в бассейне', from: '2018-07-27T14:30:00Z', to: '2018-07-27T15:30:00Z'},
    //   {label: 'Плавание', text: 'Ведет Леша в бассейне', from: '2018-07-27T13:00:00Z', to: '2018-07-27T14:30:00Z'},
    //   {label: 'Бокс', text: 'Ведет Леша в бассейне', from: '2018-07-28T13:00:00Z', to: '2018-07-28T14:30:00Z'},
    //   {label: 'Гимнастика', text: 'Ведет Леша в бассейне', from: '2018-07-29T13:00:00Z', to: '2018-07-29T14:30:00Z'},
    //   {label: 'Фитнес', text: 'Ведет Леша в бассейне', from: '2018-07-29T16:00:00Z', to: '2018-07-29T17:30:00Z'},
    //   {label: 'Фитнес', text: 'Ведет Леша в бассейне', from: '2018-07-28T16:00:00Z', to: '2018-07-28T17:30:00Z'},
    //   {label: 'Фитнес', text: 'Ведет Леша в бассейне', from: '2018-07-27T16:00:00Z', to: '2018-07-27T17:30:00Z'},
    //   {label: 'Фитнес', text: 'Ведет Леша в бассейне', from: '2018-07-26T16:00:00Z', to: '2018-07-26T17:30:00Z'},
    //   {label: 'Фитнес', text: 'Ведет Леша в бассейне', from: '2018-07-26T01:00:00Z', to: '2018-07-26T02:30:00Z'},
    //   {label: 'Фитнес', text: 'Ведет Леша в бассейне', from: '2018-07-25T16:00:00Z', to: '2018-07-25T17:30:00Z'},
    //   {label: 'Фитнес', text: 'Ведет Леша в бассейне', from: '2018-07-24T16:00:00Z', to: '2018-07-24T17:30:00Z'},
    //   {label: 'Фитнес', text: 'Ведет Леша в бассейне', from: '2018-07-23T16:00:00Z', to: '2018-07-23T17:30:00Z'}
    // ];
  }

  ngOnInit() {
    this.route.params.forEach(params => {
      this.trainerService.getById(params['id'])
        .subscribe((response) => {
          this.trainer = response;
        });
      this.updateTrainings(params['id']);
    });
  }

  updateTrainings(trainerId: number) {
    this.trainerService.getTrainings(trainerId, '2018-07-23T16:00:00Z', '2019-07-23T16:00:00Z')
      .subscribe((response) => {
        this.trainings = response.items.map(i => <SchedulerItem>{
          label: i.sport.name,
          from: i.startDate.toString()
        });
      });
  }

  getDayFromDate(dateString: string): string {
    const date = new Date(dateString);
    const weekDay = date.getDay();
    switch (weekDay) {
      case 0:
        return 'sunday';
      case 1:
        return 'monday';
      case 2:
        return 'tuesday';
      case 3:
        return 'wednesday';
      case 4:
        return 'thursday';
      case 5:
        return 'friday';
      case 6:
        return 'saturday';
      default:
        return '';
    }
  }

  getTopFromTime(dateString: string): number {
    const date = new Date(dateString);
    const h = date.getHours();
    const m = date.getMinutes();
    return (60 * h) + m;
  }

  private getHeightFromTime(fromString: string, toString: string): number {
    const from = new Date(fromString);
    const to = new Date(toString);
    return (to.getTime() - from.getTime()) / 60000;
  }

  getSchedulerItemStyle(fromString: string, toString: string): Object {
    return {
      'height.px': this.getHeightFromTime(fromString, toString),
      'top.px': this.getTopFromTime(fromString)
    };
  }

  showAddTrainingDialog() {
    if (isNullOrUndefined(this.trainer)) {
      return;
    }
    this.dialog.open(AddTrainerTrainingDialogComponent, {
      data: <AddTrainerTrainingDialogData> {
        trainerId: this.trainer.id,
        sports: this.trainer.sports
      }
    })
      .afterClosed()
      .subscribe(() => {
          this.updateTrainings(this.trainer.id);
        }
      );
  }
}
