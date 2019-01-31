import {AfterViewInit, Directive, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
  selector: 'button[sl-button], a[sl-button], input[type="submit"][sl-button]',
  exportAs: 'sl-button'
})
export class ButtonDirective implements AfterViewInit {

  spinnerHTML;

  private _slLoading;
  @Input() set slLoading(value: boolean) {
    if (value !== undefined) {
      this._slLoading = value;
      this.toggleLoading(this._slLoading);
    } else {
      this.spinnerInit();
    }
  }

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
  }

  toggleLoading(value: boolean) {
    if (value) {
      this.renderer.addClass(this.elementRef.nativeElement, 'sl-loading-button');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'sl-loading-button');
    }
  }

  get slLoading() {
    return this._slLoading;
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
    if (this.elementRef.nativeElement.attributes['ng-reflect-sl-loading']) {
      this.spinnerInit();
    }
  }

  spinnerInit() {
    const color = this.elementRef.nativeElement.style;
    this.spinnerHTML = document.createElement('div');
    this.spinnerHTML.className = 'spinner-button';
    this.spinnerHTML.innerHTML = `
    <div class="spinner-container">
    <div class="sl-button-spinner"
         mode="indeterminate" role="progressbar" style="width: 22px;height: 22px;">
      <svg focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100"
           style="width: 22px;height: 22px;">
        <circle cx="50%" cy="50%" r="45"
                style="animation-name: mat-progress-spinner-stroke-rotate-100; stroke-dasharray: 282.743px; stroke-width: 10%;"></circle>
      </svg>
    </div>
  </div>`;
    this.spinnerHTML.style.backgroundColor = color;
    this.renderer.appendChild(this.elementRef.nativeElement, this.spinnerHTML);
  }
}
