import {AfterViewInit, Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: 'input[sl-input], textarea[sl-input]',
  exportAs: 'sl-input'
})
export class InputDirective implements AfterViewInit {

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'sl-input');
    if (this.elementRef.nativeElement.attributes['type']) {
      switch (this.elementRef.nativeElement.attributes['type'].nodeValue) {
        case 'tel': // Если телефон
          if (!this.elementRef.nativeElement.attributes['id']) {
            this.elementRef.nativeElement.setAttribute('id', 'phone');
          }
          if (!this.elementRef.nativeElement.attributes['name']) {
            this.elementRef.nativeElement.setAttribute('name', 'phone');
          }
          if (!this.elementRef.nativeElement.attributes['placeholder']) {
            this.elementRef.nativeElement.placeholder = '+7 (999) 000-00-00';
          }
          break;
      }
    }
  }
}
