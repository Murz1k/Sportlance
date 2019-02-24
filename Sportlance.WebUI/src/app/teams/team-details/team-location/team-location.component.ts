import {Component, Input, OnInit} from '@angular/core';
import {TeamResponse} from '../../../shared/teams/requests/team-response';
import {AuthService} from '../../../core/auth/auth.service';
import {MatDialog} from '@angular/material';
import {TeamLocationEditDialogComponent} from './team-location-edit-dialog/team-location-edit-dialog.component';

@Component({
  selector: 'sl-team-location',
  templateUrl: './team-location.component.html',
  styleUrls: ['./team-location.component.scss']
})
export class TeamLocationComponent implements OnInit {

  @Input() team: TeamResponse;

  myMap;
  placemark;

  constructor(private dialog: MatDialog, public authService: AuthService) {
  }

  ngOnInit() {
    this.authService.setPermissions(
      `teams:map:edit:${this.team.id}`,
      this.authService.isCurrentUser(this.team.authorId));
    this.buildMaps(this.team.geo);
  }

  showEditAddressDialog() {
    this.dialog.open(TeamLocationEditDialogComponent, {data: this.team})
      .afterClosed()
      .subscribe((result) => {
          if (result) {
            this.team = result;
            this.createMap(this.team.geo);
          }
        }
      );
  }

  private buildMaps(geo: any) {
    if (!geo) {
      return;
    }
    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.

    if (ymaps) {
      ymaps.ready(() => {
        this.myMap = new ymaps.Map('map', {
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

        this.placemark = new ymaps.Placemark([+geo.longitude, +geo.latitude], {
          balloonContent: 'цвет <strong>красный</strong>'
        }, {
          preset: 'islands#redSportIcon'
        });
        this.myMap.geoObjects.add(this.placemark);
      });
    } else {
      window.onload = () => ymaps.ready(() => {
        this.myMap = new ymaps.Map('map', {
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

        this.placemark = new ymaps.Placemark(this.myMap.getCenter(), {
          balloonContent: 'цвет <strong>красный</strong>'
        }, {
          preset: 'islands#redSportIcon'
        });
        this.myMap.geoObjects.add(this.placemark);
      });
    }
  }

  private createMap(geo) {
    // Если карта еще не была создана, то создадим ее и добавим метку с адресом.
    if (!this.myMap) {
      this.myMap = new ymaps.Map('map', {
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
      this.placemark = new ymaps.Placemark(this.myMap.getCenter(), {
        balloonContent: 'цвет <strong>красный</strong>'
      }, {
        preset: 'islands#redSportIcon'
      });
      this.myMap.geoObjects.add(this.placemark);
      // Если карта есть, то выставляем новый центр карты и меняем данные и позицию метки в соответствии с найденным адресом.
    } else {
      this.myMap.setCenter([+geo.longitude, +geo.latitude], +geo.zoom);
      this.placemark.geometry.setCoordinates([+geo.longitude, +geo.latitude]);
      this.placemark.properties.set({
        balloonContent: 'цвет <strong>красный</strong>'
      }, {
        preset: 'islands#redSportIcon'
      });
    }
  }
}
