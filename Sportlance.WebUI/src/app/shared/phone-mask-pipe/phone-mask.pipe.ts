import {Pipe, PipeTransform} from '@angular/core';


const masks = [
  '1',
  '1 (1',
  '1 (11',
  '1 (111',
  '1 (111) 1',
  '1 (111) 11',
  '1 (111) 11-1',
  '1 (111) 11-11',
  '1 (111) 11-111',
  '1 (111) 111-111',
  '1 (111) 111-11-11'
];

const clean = (number) => {
  return number
    .toString()
    .replace(/[^\d^]/gm, '');
};

const format = (number) => {
  let lastCharIndex = 0;
  const cleanValue = clean(number);
  const charCount = cleanValue.replace(/\^/gm, '').length;
  if (charCount === 0) {
    return {
      formatted: '',
      cursorPosition: 0
    };
  }
  const mask = masks[charCount - 1];
  if (charCount > 1 && !mask) {
    return null;
  }
  let cursorPosition;
  const formatted = mask.split('').map((c, i) => {
    if (c === '1') {
      if (cleanValue[lastCharIndex] === '^') {
        cursorPosition = i + 1;
        lastCharIndex++;
      }

      lastCharIndex++;
      if (i === 0 && cleanValue[i] === '7') {
        return `+${cleanValue[lastCharIndex - 1]}`;
      }

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

@Pipe({
  name: 'phoneMask'
})
export class PhoneMaskPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof value === 'string') {
      return format(value).formatted;
    }
    return value;
  }
}
