import {Component, HostListener, OnInit} from '@angular/core';
import {Paths} from '../../core/paths';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {TeamsService} from '../teams.service';
import {TeamResponse} from '../../shared/teams/requests/team-response';

@Component({
  selector: 'sl-teams-map',
  templateUrl: './teams-map.component.html',
  styleUrls: ['./teams-map.component.scss']
})
export class TeamsMapComponent implements OnInit {

  map;
  myMap;

  teams: TeamResponse[] = [];
  isRendering = true;
  isLoading = false;
  public isAuthorized = false;
  public Paths = Paths;

  public search: string;
  public country: string;
  public city: string;

  public minPrice?: number;
  public maxPrice?: number;

  public minFeedbacksCount?: number;
  public maxFeedbacksCount?: number;

  public subscription: Subscription;

  constructor(private teamsService: TeamsService) {
  }

  ngOnInit() {
    this.map = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight - 46
    };

    this.buildMaps(55.751574, 37.573856);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {

    this.map = {
      width: event.target.innerWidth,
      height: event.target.innerHeight - 46
    };

    this.myMap.container.fitToViewport();
  }

  private getUserPosition() {
    const geolocation = ymaps.geolocation;

    // Сравним положение, вычисленное по ip пользователя и
    // положение, вычисленное средствами браузера.
    geolocation.get({
      provider: 'yandex',
      mapStateAutoApply: true
    }).then((result) => {
      // Красным цветом пометим положение, вычисленное через ip.
      // result.geoObjects.options.set('preset', 'islands#redCircleIcon');
      // result.geoObjects.get(0).properties.set({
      //   balloonContentBody: 'Мое местоположение'
      // });
      // this.myMap.geoObjects.add(result.geoObjects);

      this.myMap.setCenter(result.geoObjects.get(0).getLocation(), 6);
    });

    geolocation.get({
      provider: 'browser',
      mapStateAutoApply: true
    }).then((result) => {
      // Синим цветом пометим положение, полученное через браузер.
      // Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.
      // result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
      // this.myMap.geoObjects.add(result.geoObjects);
    });
  }

  private buildMaps(longitude: number, latitude: number) {
    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    window.onload = () => ymaps.ready(() => {
      this.myMap = new ymaps.Map('map', {
          center: [longitude, latitude],
          zoom: 11,
          // Также доступны наборы 'default' и 'largeMapDefaultSet'
          // Элементы управления в наборах подобраны оптимальным образом
          // для карт маленького, среднего и крупного размеров.
          controls: []
        },
        {
          suppressMapOpenBlock: true
        });

      this.getUserPosition();
      this.updateData(this.myMap.getBounds());

      this.myMap.events.add('actionend', () => {
        this.updateData(this.myMap.getBounds());
      });
    });
  }

  updateData(coordinates) {
    this.isRendering = true;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.teamsService.get(<any>{
      search: this.search,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      city: this.city,
      country: this.country,
      feedbacksMinCount: this.minFeedbacksCount,
      feedbacksMaxCount: this.maxFeedbacksCount,

      leftUpperCornerLongitude: coordinates[0][0],
      leftUpperCornerLatitude: coordinates[0][1],
      rightLowerCornerLongitude: coordinates[1][0],
      rightLowerCornerLatitude: coordinates[1][1]
    }).subscribe(response => {
      if (response.items) {
        this.teams = response.items;

        this.isRendering = false;


        const coords = this.teams.map(i => [i.geo.longitude, i.geo.latitude]);

        const myGeoObjects = [];

        for (let i = 0; i < coords.length; i++) {
          myGeoObjects[i] = new ymaps.GeoObject({
            geometry: {
              type: 'Point',
              coordinates: coords[i]
            }
          });
        }

        const myClusterer = new ymaps.Clusterer();
        myClusterer.add(myGeoObjects);
        this.myMap.geoObjects.removeAll();
        this.myMap.geoObjects.add(myClusterer);
      }
    });
  }

  private cutAbout(about: string): string {
    if (!about) {
      return '';
    }

    if (about.length <= 167) {
      return about;
    }
    return about.substring(0, 167) + '...';
  }
}
