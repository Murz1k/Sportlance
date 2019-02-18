import {Component, OnInit} from '@angular/core';
import {TrainersService} from '../trainers.service';
import {ActivatedRoute} from '@angular/router';
import {TrainerProfileResponse} from '../../shared/trainers/responses/trainer-profile-response';
import {SchedulerItem} from './scheduler-item';
import {isNullOrUndefined} from 'util';
import {MatDialog} from '@angular/material';
import {AddTrainerTrainingDialogComponent} from '../trainer-details/add-trainer-training-dialog/add-trainer-training-dialog.component';
import {AddTrainerTrainingDialogData} from '../trainer-details/add-trainer-training-dialog/add-trainer-training-dialog-data';
import * as moment from 'moment';

@Component({
  selector: 'sl-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  public trainings: SchedulerItem[] = [];
  public newTrainings: SchedulerItem[] = [];
  public trainer: TrainerProfileResponse;

  public currentWeek: any[] = [];
  public nextWeek: any[] = [];
  private firstDate = new Date();
  private lastDate = new Date();
  public scrollLeft: boolean;
  public noAnim: boolean;
  public currentMonth: string;

  constructor(private route: ActivatedRoute,
              private trainerService: TrainersService,
              private dialog: MatDialog) {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const date = new Date();
    if (currentDay === 0) {
      this.lastDate = currentDate;
      this.firstDate.setDate(this.firstDate.getDate() - 6);
      date.setDate(date.getDate() - 6);
    }
    moment.locale('ru');
    for (let i = 0; i < 7; i++) {
      this.currentWeek.push({
        day: moment(date).format('D'),
        weekDay: moment(date).format('dddd'),
        date: date,
        active: date.getDate() === new Date().getDate()
      });
      date.setDate(date.getDate() + 1);
    }
    this.currentMonth = this.currentWeek[this.currentWeek.length - 1].date.getDay() >= 4 ?
      this.wrapMonth[this.currentWeek[this.currentWeek.length - 1].date.getMonth()]
      : this.wrapMonth[this.currentWeek[0].date.getMonth()];
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
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

  scrollToLeft() {
    this.nextWeek = [];
// Формируем страницу
    const nextMonday = new Date(this.currentWeek[this.currentWeek.length - 1].date);

    moment.locale('ru');
    for (let i = 0; i < 7; i++) {
      this.nextWeek.push({
        day: moment(nextMonday).format('D'),
        weekDay: moment(nextMonday).format('dddd'),
        date: nextMonday,
        active: nextMonday.getDate() === new Date().getDate()
      });
      nextMonday.setDate(nextMonday.getDate() + 1);
    }
    // Загружаем данные
    // добавляем класс для скролла
    this.scrollLeft = true;
    // ожидаем когда анимация пройдет
    this.delay(300).then(() => {
      this.noAnim = true;

      this.currentWeek = this.nextWeek;

      this.currentMonth = this.currentWeek[this.currentWeek.length - 1].date.getDay() > 3 ?
        this.wrapMonth[this.currentWeek[this.currentWeek.length - 1].date.getMonth()]
        : this.wrapMonth[this.currentWeek[0].date.getMonth()];

      const startDate = `${moment(this.currentWeek[0].date).format('YYYY-MM-DD')}T00:00:00Z`;
      const endDate = `${moment(this.currentWeek[this.currentWeek.length - 1].date).format('YYYY-MM-DD')}T23:59:59Z`;
      this.trainerService.getTrainings(this.trainer.id, startDate, endDate)
        .subscribe((response) => {
          this.newTrainings = response.items.map(i => <SchedulerItem>{
            label: i.sport.name,
            from: i.startDate.toString()
          });
        });

      // удаляем предыдущю страницу
      this.scrollLeft = false;
      this.noAnim = false;
    });
  }

  public wrapMonth = ['янв.', 'февр.', 'март', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'];

  updateTrainings(trainerId: number) {
    const startDate = `${moment(this.firstDate).format('YYYY-MM-DD')}T00:00:00Z`;
    const endDate = `${moment(this.lastDate).format('YYYY-MM-DD')}T23:59:59Z`;
    this.trainerService.getTrainings(trainerId, startDate, endDate)
    //this.trainerService.getTrainings(trainerId, '2018-07-23T16:00:00Z', '2019-07-23T16:00:00Z')
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
        skills: this.trainer.skills
      }
    })
      .afterClosed()
      .subscribe(() => {
          this.updateTrainings(this.trainer.id);
        }
      );
  }
}
