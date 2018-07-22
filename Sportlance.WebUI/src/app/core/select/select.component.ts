import {
  Component,
  Input,
  forwardRef,
  OnChanges,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';
import {FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS} from '@angular/forms';
import {isNullOrUndefined, isUndefined} from 'util';
import {SelectItem} from './select-item';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true},
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => SelectComponent), multi: true}
  ]
})
export class SelectComponent implements ControlValueAccessor, OnChanges, OnInit {

  public isSelectHidden: boolean;
  public selectedInput = false;
  public selectedItemLabel: string;

  @Input('selectedItemValue') _selectedItemValue: string | number | null = null;
  @Input() placeholder: string;
  @Input() items: SelectItem[];
  @Input() elementId: string;
  @Input() elementName: string;
  @Input() form?: FormGroup;
  @Input() hasEmptyValue = true;
  @Input() defaultValue?: string | number;
  @Output() select: EventEmitter<string | number | null> = new EventEmitter<string | number | null>();

  constructor(private nativeElement: ElementRef) {
  }

  public propagateChange: any = () => {
  }

  public validateFn: any = () => {
  }

  get selectedItemValue() {
    return this._selectedItemValue;
  }

  set selectedItemValue(value: string | number) {
    this._selectedItemValue = value;
    this.propagateChange(value);
    this.select.emit(value);
  }

  public ngOnChanges(inputs) {
    this.propagateChange(this.selectedItemValue);
  }

  public writeValue(value) {
    if (value) {
      this.selectedItemValue = value;
    }
    this.setDefaultValue(value);
  }

  public ngOnInit() {
    this.selectedItemLabel = '';
    this.selectedItemValue = '';
    if (!isUndefined(this.defaultValue)) {
      this.setDefaultValue(this.defaultValue);
    }
  }

  public setDefaultValue(value) {
    const item = this.items.find(i => i.value === value);
    this.selectedItemLabel = isNullOrUndefined(item) ? '' : item.label;
    this.selectedItemValue = value;
  }

  public registerOnTouched() {
  }

  public validate(c: FormControl) {
    return this.validateFn(c);
  }

  public showSelectList($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.isSelectHidden = false;
    this.selectedInput = true;
  }

  @HostListener('document:click', ['$event']) hideSelectList() {
    this.isSelectHidden = true;
  }

  public selectItem(label: string, value: string | number | null) {
    this.selectedItemLabel = label;
    this.selectedItemValue = value;
    this.isSelectHidden = true;
  }

  public onSelectInputChange() {
    this.selectedItemValue = '';
  }

  public resetSelection() {
    this.selectedItemValue = '';
    this.selectedItemLabel = '';
    this.isSelectHidden = true;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }
}
