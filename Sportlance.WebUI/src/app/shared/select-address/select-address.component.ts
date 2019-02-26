import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'sl-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectAddressComponent),
      multi: true,
    }
  ]
})
export class SelectAddressComponent implements OnInit, ControlValueAccessor {

  suggestView;
  @Input() defaultValue;

  _value;

  @Input() placeholder;

  constructor() {
  }

  ngOnInit() {
    if (typeof ymaps !== 'undefined') {
      ymaps.ready(() => this.init());
    } else {
      window.onload = () => ymaps.ready(() => this.init());
    }
  }

  private init() {
    // Подключаем поисковые подсказки к полю ввода.
    this.suggestView = new ymaps.SuggestView('suggest');

    this.suggestView.events.add(['select'], () => {
      this.geocode();
    });
  }

  private propagateChange = (_: any) => {
  };

  private geocode() {
    // Забираем запрос из поля ввода.
    const request = (document.getElementById('suggest') as HTMLInputElement).value;
    // Геокодируем введённые данные.
    ymaps.geocode(request).then((res) => {
      let obj = res.geoObjects.get(0),
        error, hint;

      if (obj) {
        // Об оценке точности ответа геокодера можно прочитать тут: https://tech.yandex.ru/maps/doc/geocoder/desc/reference/precision-docpage/
        switch (obj.properties.get('metaDataProperty.GeocoderMetaData.precision')) {
          case 'exact':
            break;
          case 'number':
          case 'near':
          case 'range':
            error = 'Неточный адрес, требуется уточнение';
            hint = 'Уточните номер дома';
            break;
          case 'street':
            error = 'Неполный адрес, требуется уточнение';
            hint = 'Уточните номер дома';
            break;
          case 'other':
          default:
            error = 'Неточный адрес, требуется уточнение';
            hint = 'Уточните адрес';
        }
      } else {
        error = 'Адрес не найден';
        hint = 'Уточните адрес';
      }

      // Если геокодер возвращает пустой массив или неточный результат, то показываем ошибку.
      if (error) {
        // showError(error);
        // showMessage(hint);
      } else {
        // this._selectedAddressLabel = obj.getAddressLine();
        this._value = obj;
        this.propagateChange(obj);
      }
    }, function (e) {
      console.log(e);
    });
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    this.defaultValue = obj;
  }
}
