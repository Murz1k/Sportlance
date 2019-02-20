import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'workDate'
})
export class TrainerWorkDatePipe implements PipeTransform {

  transform(value: any): any {
    if (!value) {
      return 'настоящее время';
    }
    return moment(value).format('D MMM Y');
  }
}
