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
  }
}
