import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  QueryList
} from '@angular/core';
import {SlRadioButtonComponent} from './radio-button/radio-button.component';
import {SelectItem} from '../select/select-item';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'sl-radio-group',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlRadioGroupComponent),
      multi: true,
    }
  ]
})
export class SlRadioGroupComponent implements OnInit, ControlValueAccessor, AfterContentInit {

  @Input() disabled = false;
  @Input() isInline = false;

  @ContentChildren(SlRadioButtonComponent) buttons: QueryList<SlRadioButtonComponent>;
  @Output() OnChange = new EventEmitter<any>();

  _value: any = undefined;
  _items: SelectItem[] = [];

  _selectedItem = {label: '', value: undefined};

  constructor(private _elementRef: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this._items = this.buttons.map(i => <SelectItem>{value: i.value, label: i.getLabel()});

    this.buttons.changes.subscribe((options: SlRadioButtonComponent[]) =>
      this._items = options.map(i => <SelectItem>{value: i.value, label: i.getLabel()})
    );
  }

  onChange: any = () => {
  };

  onTouched: any = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  selectValue(value: number, $event: Event) {
    $event.preventDefault();
    $event.stopPropagation();

    this.writeValue(value);
    this.onTouched();
  }

  set value(obj: any) {
    this.writeValue(obj);
  }

  get value(): any {
    return this._value;
  }

  writeValue(obj: any): void {

    if (obj === this._selectedItem.value) {
      return;
    }

    if (!this._items) {
      return;
    }

    const currentItem = this._items.find(i => i.value === obj);

    if (!currentItem) {
      this._selectedItem = {label: '', value: undefined};
    } else {
      this._selectedItem = currentItem;
    }

    this._value = obj;

    this.onChange(obj);
  }
}
