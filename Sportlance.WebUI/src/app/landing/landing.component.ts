import {Component} from '@angular/core';
import {Image} from './image';
import {Paths} from '../core/paths';
import {AccountService} from "../services/account-service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  public trainerLink: string;
  public clubLink: string;
  public images: Image[] = [];

  constructor(private accountService: AccountService) {
    this.trainerLink = this.accountService.isAuthorized ? Paths.Trainers : Paths.Login;
    this.clubLink = this.accountService.isAuthorized ? Paths.Teams : Paths.Login;
    this.images = [
      {
        'title': 'Первый призыв к действию',
        'descr': 'Первое описание для призыва к действию с плюшками, вкусняшками и прочим',
        'btnText': 'Начать тренировку',
        'btnLink': this.trainerLink,
        'url': 'assets/client-back.jpg'
      },
      {
        'title': 'Второй призыв к действи',
        'descr': 'Второе описание для призыва к действию с плюшками, вкусняшками и прочим',
        'btnText': 'Получить клиентов',
        'btnLink': this.clubLink,
        'url': 'assets/be-trainer-background.jpg'
      },
      {
        'title': 'Третий призыв к действию',
        'descr': 'Третье описание для призыва к действию с плюшками, вкусняшками и прочим',
        'btnText': 'Увеличить продажи',
        'btnLink': this.clubLink,
        'url': 'assets/be-trainer-background.jpg'
      }
    ];
  }
}
