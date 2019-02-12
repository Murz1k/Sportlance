import {Component, Input, OnInit} from '@angular/core';
import {TeamResponse} from '../../../shared/teams/requests/team-response';

@Component({
  selector: 'sl-team-location',
  templateUrl: './team-location.component.html',
  styleUrls: ['./team-location.component.scss']
})
export class TeamLocationComponent implements OnInit {

  @Input() team: TeamResponse;

  constructor() {
  }

  ngOnInit() {
    this.buildMaps(this.team.geo);
  }

  private buildMaps(geo: any) {
    if (!geo) {
      return;
    }
    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ymaps.ready(() => {
      console.log(+geo.longitude);
      console.log(+geo.latitude);
      const myMap = new ymaps.Map('map', {
          center: [+geo.longitude, +geo.latitude],
          zoom: geo.zoom,
          // Также доступны наборы 'default' и 'largeMapDefaultSet'
          // Элементы управления в наборах подобраны оптимальным образом
          // для карт маленького, среднего и крупного размеров.
          controls: []
        },
        {
          suppressMapOpenBlock: true
        });

      myMap.geoObjects.add(new ymaps.Placemark([+geo.latitude, +geo.longitude], {
        balloonContent: 'цвет <strong>красный</strong>'
      }, {
        preset: 'islands#redSportIcon'
      }));
    });
  }
}
