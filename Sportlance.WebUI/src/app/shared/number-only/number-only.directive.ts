import {ElementRef, Input, forwardRef, Directive, HostListener} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

const noop = () => {
};

const clean = (number) => {
  return number
    .toString()
    .replace(/[^\d]/gm, '');
};

const format = (number) => {
  const cursorPosition = 0;
  return {
    formatted: clean(number),
    cursorPosition
  };
};

@Directive({
  selector: '[slNumberOnly]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberOnlyDirective),
      multi: true
    }
  ]
})
export class NumberOnlyDirective {

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @Input() public valueType: 'clean' | 'full' = 'clean';
  @Input() public showMask = true;

  public disabled;
  private _value;
  private oldValue = '';

  constructor(private input: ElementRef) {
  }

  updateInputView() {
    const input = this.input.nativeElement;
    const cursorPosition = input.selectionStart;
    const value = this._value;
    const valueWithCursor = value.substring(0, cursorPosition) + '^' + value.substring(cursorPosition);

    const formatted = format(valueWithCursor);


    if (!formatted) {
      input.value = this.oldValue;
      return;
    }

    const newValue = formatted.formatted;
    if (newValue !== input.value) {
      input.value = newValue;
      input.setSelectionRange(formatted.cursorPosition, formatted.cursorPosition);
    }
    this.oldValue = newValue;
    this.emitValue(newValue);
  }

  emitValue(v) {
    let value;
    if (this.valueType === 'clean') {
      value = v.replace(/[^\d+]/gm, '');
    } else if (this.valueType === 'full') {
      value = v;
    }
    this.onChangeCallback(value);
  }

  @HostListener('input')
  onInput() {
    this._value = this.input.nativeElement.value;
    this.updateInputView();
  }

  set value(v) {
    const value = v ? v : '';
    this._value = value;
    this.updateInputView();
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
}
