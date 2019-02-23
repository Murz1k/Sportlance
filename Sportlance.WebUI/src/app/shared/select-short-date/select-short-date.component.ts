import {Component, ElementRef, forwardRef, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const clean = (number) => {
  return number
    .toString()
    .replace(/[^\d^]/gm, '');
};

@Component({
  selector: 'sl-select-short-date',
  templateUrl: './select-short-date.component.html',
  styleUrls: ['./select-short-date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectShortDateComponent),
      multi: true,
    }
  ]
})
export class SelectShortDateComponent implements OnInit, ControlValueAccessor {

  _value: Date;

  items = [];

  _selectedMonth;

  _currentYear: number;

  @ViewChild('input') inputElement: ElementRef;

  constructor() {
  }

  ngOnInit() {
    this.items = [
      {label: 'Январь', value: 1},
      {label: 'Февраль', value: 2},
      {label: 'Март', value: 3},
      {label: 'Апрель', value: 4},
      {label: 'Май', value: 5},
      {label: 'Июнь', value: 6},
      {label: 'Июль', value: 7},
      {label: 'Август', value: 8},
      {label: 'Сентябрь', value: 9},
      {label: 'Октябрь', value: 10},
      {label: 'Ноябрь', value: 11},
      {label: 'Декабрь', value: 12}
    ];
  }

  private propagateChange = (_: any) => {
  };

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value: any): void {

    if (typeof value === 'string' || typeof value === 'number') {
      this._value = new Date(value);
    }

    if (value instanceof Date) {
      this._value = value;
    }

    if (this._value) {
      this._selectedMonth = this.items.find(i => i.value === this._value.getMonth() + 1);
      this._currentYear = this._value.getFullYear();
    }
  }

  public onSelect(value) {
    this._selectedMonth = value;
    this.buildDate();
  }

  public onInput(value) {
    this._currentYear = clean(value);
    this.inputElement.nativeElement.value = this._currentYear;
    this.buildDate();
  }

  buildDate() {
    if (this._selectedMonth && this._currentYear) {
      this._value = new Date(Date.UTC(this._currentYear, this._selectedMonth.value - 1));
      this.propagateChange(this._value);
    }
  }
}
