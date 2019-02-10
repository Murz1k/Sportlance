import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Paths} from '../../../core/paths';
import {Router} from '@angular/router';
import {MyTeamsService} from '../my-teams.service';
import {catchError, tap} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';
import {throwError} from 'rxjs';

@Component({
  selector: 'sl-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {

  constructor(private titleService: Title,
              private router: Router,
              private formBuilder: FormBuilder,
              private teamsService: MyTeamsService) {
  }

  public form: FormGroup;

  public isLoading = false;
  public isDisabled = false;

  map;
  placemark;

  ngOnInit(): void {
    this.titleService.setTitle(`Создать команду | Sportlance`);

    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      country: ['', Validators.required],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      geo: [undefined, [Validators.required]],
      about: ['']
    });

    this.form.controls['address'].valueChanges.subscribe((value) => {
      const mapContainer = document.getElementById('map');
      const geo = ymaps.util.bounds.getCenterAndZoom(value.properties.get('boundedBy'),
        [mapContainer.clientWidth, mapContainer.clientHeight]
      );
      this.form.controls['geo'].setValue({latitude: geo.center[0], longitude: geo.center[1], zoom: geo.zoom});
      console.log(this.form.controls['geo'].value);
      this.showResult(value);
    });
  }

  submit() {
    for (let key in this.form.value) {
      this.form.controls[key].markAsDirty();
    }
    if (this.form.controls['address'].value) {
      this.form.controls['country'].setValue(this.form.controls['address'].value.getCountry());
      this.form.controls['city'].setValue(this.form.controls['address'].value.getLocalities()[0]);
    }

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    this.isDisabled = true;

    this.teamsService.add(
      this.form.controls['title'].value,
      this.form.controls['subtitle'].value,
      this.form.controls['phoneNumber'].value,
      this.form.controls['country'].value,
      this.form.controls['city'].value,
      this.form.controls['address'].value,
      this.form.controls['about'].value,
      null,
      this.form.controls['geo'].value
    ).pipe(tap((response: any) => {
      if (!response || !response.error) {
        this.router.navigate([Paths.Settings, 'my-teams']);
      }
      this.isDisabled = false;
      this.isLoading = false;
    }), catchError((error) => {
      this.isDisabled = false;
      this.isLoading = false;
      return throwError(error);
    })).subscribe();
  }

  private showResult(obj) {
    // Удаляем сообщение об ошибке, если найденный адрес совпадает с поисковым запросом.
    // $('#suggest').removeClass('input_error');
    // $('#notice').css('display', 'none');

    const mapContainer = document.getElementById('map'),
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

// function showError(message) {
//   $('#notice').text(message);
//   $('#suggest').addClass('input_error');
//   $('#notice').css('display', 'block');
//   // Удаляем карту.
//   if (map) {
//     map.destroy();
//     map = null;
//   }
// }

  private createMap(state, caption) {
    // Если карта еще не была создана, то создадим ее и добавим метку с адресом.
    if (!this.map) {
      this.map = new ymaps.Map('map', state);
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

// function showMessage(message) {
//   $('#messageHeader').text('Данные получены:');
//   $('#message').text(message);
// }
}
