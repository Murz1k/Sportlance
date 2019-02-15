import {Component, OnInit} from '@angular/core';
import {Image} from './image';
import {Paths} from '../core/paths';
import {AuthService} from '../core/auth/auth.service';
import {Title} from '@angular/platform-browser';
import {DeviceDetectorService} from 'ngx-device-detector';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  public form: FormGroup;

  searchTypes = [];
  targets = [];
  sportTypes = [];

  constructor(private formBuilder: FormBuilder,
              private deviceService: DeviceDetectorService,
              private titleService: Title,
              private authService: AuthService
  ) {
  }

  ngOnInit(): void {

    this.searchTypes = [
      {selectLabel: 'Найти', showLabel: 'Найти', value: 0},
      {selectLabel: 'Купить', showLabel: 'Купить', value: 1}
    ];

    // Найти тренера по фитнесу от 1000 до 2000 рублей в Москве
    // (Найти) (фитнес клуб) (с бассейном, с SPA) за 20000 - 30000 рублей в Москве

    this.targets = [
      {selectLabel: 'Тренера', showLabel: 'Тренера', value: 0},
      {selectLabel: 'Фитнес клуб', showLabel: 'Фитнес клуб', value: 1},
      {selectLabel: 'Тренажерный зал', showLabel: 'Тренажерный зал', value: 2},
      {selectLabel: 'Бассейн', showLabel: 'Бассейн', value: 3},
      {selectLabel: 'Секцию', showLabel: 'Секцию', value: 4}
    ];

    this.sportTypes = [
      {selectLabel: 'По фитнесу', showLabel: 'По фитнесу', value: 0},
      {selectLabel: 'По йоге', showLabel: 'По йоге', value: 1},
      {selectLabel: 'По плаванию', showLabel: 'По плаванию', value: 2},
      {selectLabel: 'По единоборствам', showLabel: 'По единоборствам', value: 3}
    ];

    this.form = this.formBuilder.group({
      searchType: [this.searchTypes[0].value],
      searchTarget: [this.targets[0].value],
      searchSportType: [this.sportTypes[0].value],
      searchFromPrice: ['от 1000'],
      searchToPrice: ['до 2000']
    });

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
