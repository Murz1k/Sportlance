import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {TeamsService} from '../../../teams.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeamResponse} from '../../../../shared/teams/requests/team-response';

@Component({
  selector: 'sl-team-location-edit-dialog',
  templateUrl: './team-location-edit-dialog.component.html',
  styleUrls: ['./team-location-edit-dialog.component.scss']
})
export class TeamLocationEditDialogComponent implements OnInit {

  public form: FormGroup;
  public isLoading: boolean;
  map;
  placemark;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public team: TeamResponse,
              private dialogRef: MatDialogRef<TeamLocationEditDialogComponent>,
              private teamService: TeamsService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      country: [this.team.country, Validators.required],
      address: [this.team.address, [Validators.required]],
      city: [this.team.city, [Validators.required]],
      geo: [this.team.geo, [Validators.required]]
    });

    this.buildMaps(this.team.geo);

    this.form.controls['address'].valueChanges.subscribe((value) => {
      const mapContainer = document.getElementById('edit-address-map');
      const geo = ymaps.util.bounds.getCenterAndZoom(value.properties.get('boundedBy'),
        [mapContainer.clientWidth, mapContainer.clientHeight]
      );
      this.form.controls['geo'].setValue({longitude: geo.center[0], latitude: geo.center[1], zoom: geo.zoom});
      this.showResult(value);
    });
  }

  private showResult(obj) {
    // Удаляем сообщение об ошибке, если найденный адрес совпадает с поисковым запросом.
    // $('#suggest').removeClass('input_error');
    // $('#notice').css('display', 'none');

    const mapContainer = document.getElementById('edit-address-map'),
      bounds = obj.properties.get('boundedBy'),
      // Рассчитываем видимую область для текущего положения пользователя.
      mapState = ymaps.util.bounds.getCenterAndZoom(
        bounds,
        [mapContainer.clientWidth, mapContainer.clientHeight]
      ),
      // Сохраняем полный адрес для сообщения под картой.
      address = [obj.getCountry(), obj.getAddressLine()].join(', '),
      // Сохраняем укороченный адрес для подписи метки.
      shortAddress = [obj.getThoroughfare(), obj.getPremiseNumber(), obj.getPremise()].join(' ');
    // Убираем контролы с карты.
    mapState.controls = [];
    // Создаём карту.
    this.createMap(mapState, shortAddress);
    // Выводим сообщение под картой.
    // showMessage(address);
  }

  public submit() {
    if (this.form.controls['address'].value) {
      this.form.controls['country'].setValue(this.form.controls['address'].value.getCountry());
      this.form.controls['city'].setValue(this.form.controls['address'].value.getLocalities()[0]);
    }
    this.isLoading = true;
    this.teamService.updateLocation(
      this.team.id,
      this.form.controls['country'].value,
      this.form.controls['city'].value,
      this.form.controls['address'].value.getAddressLine(),
      this.form.controls['geo'].value
    )
      .pipe(
        tap((response) => {
          if (!response.error) {
            this.dialogRef.close(response);
          }
          this.isLoading = false;
        }),
        catchError((error) => {
          this.isLoading = false;
          return throwError(error);
        })
      )
      .subscribe();
  }

  private buildMaps(geo: any) {
    if (!geo) {
      return;
    }
    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.

    if (typeof ymaps !== 'undefined') {
      ymaps.ready(() => {
        this.map = new ymaps.Map('edit-address-map', {
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
        this.map.geoObjects.add(this.placemark);
      });
    } else {
      window.onload = () => ymaps.ready(() => {
        this.map = new ymaps.Map('edit-address-map', {
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
        this.map.geoObjects.add(this.placemark);
      });
    }
  }

  private createMap(state, caption) {
    // Если карта еще не была создана, то создадим ее и добавим метку с адресом.
    if (!this.map) {
      this.map = new ymaps.Map('edit-address-map', state);
      this.placemark = new ymaps.Placemark(
        this.map.getCenter(), {
          iconCaption: caption,
          balloonContent: caption
        }, {
          preset: 'islands#redDotIconWithCaption'
        });
      this.map.geoObjects.add(this.placemark);
      // Если карта есть, то выставляем новый центр карты и меняем данные и позицию метки в соответствии с найденным адресом.
    } else {
      this.map.setCenter(state.center, state.zoom);
      this.placemark.geometry.setCoordinates(state.center);
      this.placemark.properties.set({iconCaption: caption, balloonContent: caption});
    }
  }
}
