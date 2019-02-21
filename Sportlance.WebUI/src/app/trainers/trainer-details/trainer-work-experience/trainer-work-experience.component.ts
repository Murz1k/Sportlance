import {Component, Input, OnInit} from '@angular/core';
import {TrainerResponse} from '../../../shared/trainers/responses/trainer-response';
import {AuthService} from '../../../core/auth/auth.service';
import {Title} from '@angular/platform-browser';
import {TeamsService} from '../../../teams/teams.service';
import {TrainersService} from '../../trainers.service';

@Component({
  selector: 'sl-trainer-work-experience',
  templateUrl: './trainer-work-experience.component.html',
  styleUrls: ['./trainer-work-experience.component.scss']
})
export class TrainerWorkExperienceComponent implements OnInit {

  @Input() trainer: TrainerResponse;

  workExperience = [];

  totalSumm: string;

  constructor(public authService: AuthService,
              private trainersService: TrainersService) {
  }

  ngOnInit() {
    this.authService.setPermissions(`trainer:work:edit:${this.trainer.id}`, this.authService.isCurrentUser(this.trainer.id));

    this.trainersService.getWorkExperienceByTrainerId(this.trainer.id)
      .subscribe((response) => {
        this.workExperience = response;

        this.totalSumm = this.calculateMonthsTotal();
      });

    // this.workExperience = [
    //   {
    //     position: 'Младший тренер тренажерного зала',
    //     company: 'World Class',
    //     fromDate: '2019-02-20T03:48:39.873Z',
    //     description: 'Качался, зарабатывал бабло, учил качаться других',
    //     skills: ['Качалочка', 'навыки', 'набор массы', 'сжигание жира', 'прочее дерьмо']
    //   },
    //   {
    //     position: 'Младший тренер тренажерного зала',
    //     company: 'World Class',
    //     fromDate: '2019-01-20T03:48:39.873Z',
    //     toDate: '2019-02-20T03:48:39.873Z',
    //     description: 'Качался, зарабатывал бабло, учил качаться других',
    //     skills: ['Качалочка', 'навыки', 'набор массы', 'сжигание жира', 'прочее дерьмо']
    //   },
    //   {
    //     position: 'Младший тренер тренажерного зала',
    //     company: 'World Class',
    //     fromDate: '2018-05-20T03:48:39.873Z',
    //     toDate: '2019-01-20T03:48:39.873Z',
    //     description: 'Качался, зарабатывал бабло, учил качаться других' +
    //       'Качался, зарабатывал бабло, учил качаться других' +
    //       'Качался, зарабатывал бабло, учил качаться других' +
    //       'Качался, зарабатывал бабло, учил качаться других' +
    //       'Качался, зарабатывал бабло, учил качаться других' +
    //       'Качался, зарабатывал бабло, учил качаться других' +
    //       'Качался, зарабатывал бабло, учил качаться других' +
    //       'Качался, зарабатывал бабло, учил качаться других' +
    //       'Качался, зарабатывал бабло, учил качаться других' +
    //       'Качался, зарабатывал бабло, учил качаться других' +
    //       'Качался, зарабатывал бабло, учил качаться других' +
    //       'Качался, зарабатывал бабло, учил качаться других' +
    //       'Качался, зарабатывал бабло, учил качаться других' +
    //       'Качался, зарабатывал бабло, учил качаться других' +
    //       'Качался, зарабатывал бабло, учил качаться других' +
    //       'Качался, зарабатывал бабло, учил качаться других' +
    //       'Качался, зарабатывал бабло, учил качаться других' +
    //       'Качался, зарабатывал бабло, учил качаться других' +
    //       'Качался, зарабатывал бабло, учил качаться других' +
    //       'Качался, зарабатывал бабло, учил качаться других' +
    //       'Качался, зарабатывал бабло, учил качаться других',
    //     skills: ['Качалочка', 'навыки', 'набор массы', 'сжигание жира', 'прочее дерьмо']
    //   },
    //   {
    //     position: 'Младший тренер тренажерного зала',
    //     company: 'World Class',
    //     fromDate: '2000-02-20T03:48:39.873Z',
    //     toDate: '2018-01-20T03:48:39.873Z',
    //     description: 'Качался, зарабатывал бабло, учил качаться других',
    //     skills: ['Качалочка', 'навыки', 'набор массы', 'сжигание жира', 'прочее дерьмо', 'прочее дерьмо', 'прочее дерьмо']
    //   },
    //   {
    //     position: 'Младший тренер тренажерного зала',
    //     company: 'World Class',
    //     fromDate: '2016-01-20T03:48:39.873Z',
    //     toDate: '2017-01-20T03:48:39.873Z',
    //     description: 'Качался, зарабатывал бабло, учил качаться других',
    //     skills: ['Качалочка', 'навыки', 'набор массы', 'сжигание жира', 'прочее дерьмо']
    //   },
    //   {
    //     position: 'Младший тренер тренажерного зала',
    //     company: 'World Class',
    //     fromDate: '2015-01-20T03:48:39.873Z',
    //     toDate: '2016-01-20T03:48:39.873Z',
    //     description: 'Качался, зарабатывал бабло, учил качаться других',
    //     skills: ['Качалочка', 'навыки', 'набор массы', 'сжигание жира', 'прочее дерьмо']
    //   }
    // ];
  }

  calculateMonthsTotal() {
    let monthsCount = 0;
    for (let i = 0; i < this.workExperience.length; i++) {
      monthsCount += this.calculateMonthsCount(this.workExperience[i].fromDate, this.workExperience[i].toDate);
    }

    if (monthsCount === 0) {
      return '';
    }
    if (monthsCount < 12) {
      return `${monthsCount} ${this.convertMonthsToTitle(monthsCount)}`;
    }
    if (monthsCount === 12) {
      return `1 ${this.convertYearsToTitle(1)}`;
    }
    if (monthsCount > 12) {
      const yearsCount = Math.floor(monthsCount / 12);
      monthsCount = monthsCount % 12;
      if (monthsCount === 0) {
        return `${yearsCount} ${this.convertYearsToTitle(yearsCount)}`;
      } else {
        return `${yearsCount} ${this.convertYearsToTitle(yearsCount)} ${monthsCount} ${this.convertMonthsToTitle(monthsCount)}`;
      }
    }
  }

  calculateMonthsCount(from: Date, to: Date) {
    let d1: Date;
    let d2: Date;
    if (from instanceof Date) {
      d1 = from;
    }
    if (typeof from === 'string') {
      d1 = new Date(from);
    }
    if (!to) {
      d2 = new Date();
    } else {
      if (to instanceof Date) {
        d2 = to;
      }
      if (typeof to === 'string') {
        d2 = new Date(to);
      }
    }
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth() + 1;

    return months <= 0 ? 0 : months;
  }

  getSummOfDate(from: Date, to: Date) {
    let monthsCount = this.calculateMonthsCount(from, to);
    if (monthsCount === 0) {
      return '';
    }
    if (monthsCount < 12) {
      return `${monthsCount} ${this.convertMonthsToTitle(monthsCount)}`;
    }
    if (monthsCount === 12) {
      return `1 ${this.convertYearsToTitle(1)}`;
    }
    if (monthsCount > 12) {
      const yearsCount = Math.floor(monthsCount / 12);
      monthsCount = monthsCount % 12;
      if (monthsCount === 0) {
        return `${yearsCount} ${this.convertYearsToTitle(yearsCount)}`;
      } else {
        return `${yearsCount} ${this.convertYearsToTitle(yearsCount)} ${monthsCount} ${this.convertMonthsToTitle(monthsCount)}`;
      }
    }
  }

  private convertYearsToTitle(count: number): string {
    return ((((count = count % 100) >= 11 && count <= 19) || (count = count % 10) >= 5 || count === 0) ? 'лет' : (count === 1 ? 'год' : 'года'));
  }

  private convertMonthsToTitle(count: number): string {
    return ((((count = count % 100) >= 11 && count <= 19) || (count = count % 10) >= 5 || count === 0) ? 'месяцев' : (count === 1 ? 'месяц' : 'месяца'));
  }
}
