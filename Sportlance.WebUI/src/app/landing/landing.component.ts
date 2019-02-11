import {Component, OnInit} from '@angular/core';
import {Image} from './image';
import {Paths} from '../core/paths';
import {AuthService} from '../core/auth/auth.service';
import {Title} from '@angular/platform-browser';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'sl-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public trainerLink: string;
  public clubLink: string;
  public images: Image[] = [];

  public isMobile = false;

  constructor(private deviceService: DeviceDetectorService,
              private titleService: Title,
              private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();

    this.titleService.setTitle(`Sportlance`);

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
