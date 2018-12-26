import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList, ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectItem} from './select-item';
import {SlOptionComponent} from "../option/option.component";

@Component({
  selector: 'sl-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlSelectComponent),
      multi: true,
    }
  ]
})
export class SlSelectComponent implements OnInit, ControlValueAccessor, AfterContentInit {

  @ContentChildren(SlOptionComponent) options: QueryList<SlOptionComponent>;
  @Input() disabled = false;
  @Input() placeHolder = '';
  @Output() OnChange = new EventEmitter<any>();

  @ViewChild('items') itemsList: ElementRef;

  _value: any = undefined;
  _items: SelectItem[] = [];

  _selectedItem = {label: '', value: undefined};

  showList = false;

  scrollHeight = 40;
  listHeight = 0;

  constructor(private _elementRef: ElementRef) {
  }

  ngOnInit() {
  }

  show() {
    if (!this._items) {
      return;
    }

    if (this.showList) {
      this.hide();
      return;
    }

    if (this.itemsList.nativeElement.children.length > 10) {
      Array.prototype.slice.call(this.itemsList.nativeElement.children, 0, 10).map(i => this.listHeight += i.clientHeight);
    } else {
      Array.prototype.slice.call(this.itemsList.nativeElement.children).map(i => this.listHeight += i.clientHeight);
    }
    this.scrollHeight = 40 + this.listHeight;
    this.showList = true;
  }

  hide() {
    if (!this._items) {
      return;
    }

    this.listHeight = 0;
    this.scrollHeight = 40;

    setTimeout(() => {
      this.showList = false;
    }, 450);
  }

  @HostListener('document:click', ['$event.target']) clickedOutside(targetElement: ElementRef) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.hide();
    }
  }

  clickedInside($event: Event) {
    $event.preventDefault();
    // $event.stopPropagation();

    this.show();
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

    this.hide();
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
      this.onChange(obj);
    }

    this._value = obj;
  }

  ngAfterContentInit(): void {
    this._items = this.options.map(i => <SelectItem> {value: i.value, label: i.getLabel()});

    this.options.changes.subscribe((options: SlOptionComponent[]) =>
      this._items = options.map(i => <SelectItem> {value: i.value, label: i.getLabel()})
    );
  }
}
