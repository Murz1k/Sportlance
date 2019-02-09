import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'sl-teams-map',
  templateUrl: './teams-map.component.html',
  styleUrls: ['./teams-map.component.scss']
})
export class TeamsMapComponent implements OnInit {

  map;
  myMap;

  constructor() {
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

  private buildMaps(longitude: number, latitude: number) {
    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ymaps.ready(() => {
      this.myMap = new ymaps.Map('map', {
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

      // myMap.geoObjects.add(new ymaps.Placemark([longitude, latitude], {
      //   balloonContent: 'цвет <strong>красный</strong>'
      // }, {
      //   preset: 'islands#redSportIcon'
      // }))
    });
  }
}
