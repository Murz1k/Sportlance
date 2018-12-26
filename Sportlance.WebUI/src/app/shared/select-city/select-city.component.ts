import {
  Component,
  forwardRef,
  Input,
  OnInit
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'sl-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlSelectCityComponent),
      multi: true,
    }
  ]
})
export class SlSelectCityComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder = '';

  selectedCityValue;
  selectedCityLabel;

  _value = '';

  constructor() {
  }

  ngOnInit() {
  }

  private propagateChange = (_: any) => {
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value: any): void {
    this._value = value;
  }

  public onChange(value) {
    if (typeof value !== 'number') {
      this.selectedCityLabel = value;
    } else {
      this.selectedCityValue = value;
    }
    this._value = value;
    this.propagateChange(value);
  }
}
