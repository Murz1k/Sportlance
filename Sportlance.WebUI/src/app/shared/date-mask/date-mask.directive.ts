import {ElementRef, Input, forwardRef, Directive, HostListener} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

const noop = () => {
};

const masks = [
  '1',
  '11',
  '11/1',
  '11/11',
  '11/11/1',
  '11/11/11',
  '11/11/111',
  '11/11/1111'
];

const clean = (number) => {
  return number
    .toString()
    .replace(/[^\d^]/gm, '').replace(/\^/gm, '');
};

const format = (number) => {
  let cleanValue = clean(number);
  const charCount = cleanValue.length;
  if (charCount === 0) {
    return {
      formatted: '',
      cursorPosition: 0
    };
  }
  if (charCount >= 2 && number[1] !== '/') {
    if (cleanValue[0] > 3) {
      cleanValue = '01' + cleanValue.substr(2, charCount - 2);
    }
    if (charCount >= 4) {
      if (cleanValue[2] > 1) {
        cleanValue = cleanValue.substr(0, 2) + '01' + cleanValue.substr(2, charCount - 4);
      }
    }
  }
  const mask = masks[charCount - 1];
  if (charCount > 1 && !mask) {
    return null;
  }
  let cursorPosition;
  let lastCharIndex = 0;

  const formatted = mask.split('').map((c, i) => {
    if (c === '1') {
      if (cleanValue[lastCharIndex] === '^') {
        cursorPosition = i + 1;
        lastCharIndex++;
      }

      lastCharIndex++;
      return cleanValue[lastCharIndex - 1];
    } else {
      return c;
    }
  }).join('');

  if (!cursorPosition) {
    cursorPosition = formatted.length;
  }

  cursorPosition++;
  return {
    formatted: `${formatted}`,
    cursorPosition
  };
};

@Directive({
  selector: '[slDateMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateMaskDirective),
      multi: true
    }
  ]
})
export class DateMaskDirective {

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
    // if (this.valueType === 'clean') {
    //   value = v.replace(/[^\d+]/gm, '');
    // } else if (this.valueType === 'full') {
    value = v;
    // }
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

