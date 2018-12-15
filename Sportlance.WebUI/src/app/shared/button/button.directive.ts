import {AfterViewInit, Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: 'button[sl-button], a[sl-button], input[type="submit"][sl-button]',
  exportAs: 'sl-button'
})
export class ButtonDirective implements AfterViewInit {

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'sl-btn');

    if (!this.elementRef.nativeElement.attributes['sltype']) {
      this.renderer.addClass(this.elementRef.nativeElement, 'sl-btn-default');
    } else {
      switch (this.elementRef.nativeElement.attributes['sltype'].nodeValue) {
        case 'primary':
          this.renderer.addClass(this.elementRef.nativeElement, 'sl-btn-primary');
          break;
        case 'default':
          this.renderer.addClass(this.elementRef.nativeElement, 'sl-btn-default');
          break;
        case 'success':
          this.renderer.addClass(this.elementRef.nativeElement, 'sl-btn-success');
          break;
        case 'danger':
          this.renderer.addClass(this.elementRef.nativeElement, 'sl-btn-danger');
          break;
        default:
          this.renderer.addClass(this.elementRef.nativeElement, 'sl-btn-default');
          break;
      }
    }
  }
}
