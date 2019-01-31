import {Component, Input, OnInit} from '@angular/core';
import {TeamServiceResponse} from "../../../shared/teams/responses/team-service-response";

@Component({
  selector: 'sl-team-location',
  templateUrl: './team-location.component.html',
  styleUrls: ['./team-location.component.scss']
})
export class TeamLocationComponent implements OnInit {

  @Input() team: TeamServiceResponse;

  constructor() {
  }

  ngOnInit() {
    this.buildMaps(55.751574, 37.573856);
  }

  private buildMaps(longitude: number, latitude: number) {
    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ymaps.ready(function () {
      const myMap = new ymaps.Map('map', {
          center: [longitude, latitude],
          zoom: 16,
          // Также доступны наборы 'default' и 'largeMapDefaultSet'
          // Элементы управления в наборах подобраны оптимальным образом
          // для карт маленького, среднего и крупного размеров.
          controls: []
        },
        {
          suppressMapOpenBlock: true
        });

      myMap.geoObjects.add(new ymaps.Placemark([longitude, latitude], {
        balloonContent: 'цвет <strong>красный</strong>'
      }, {
        preset: 'islands#redSportIcon'
      }))
    });
  }
}
