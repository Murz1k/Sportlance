import {Component} from '@angular/core';
import {Image} from './image';
import {Paths} from '../core/paths';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  public trainerLink: string;
  public clubLink: string;
  public images: Image[] = [];

  constructor(private authService: AuthService) {
    this.trainerLink = this.authService.isAuthorized ? Paths.Trainers : Paths.Login;
    this.clubLink = this.authService.isAuthorized ? Paths.Teams : Paths.Login;
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
