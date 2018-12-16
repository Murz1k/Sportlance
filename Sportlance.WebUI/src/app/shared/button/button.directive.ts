import {AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: 'button[sl-button], a[sl-button], input[type="submit"][sl-button]',
  exportAs: 'sl-button'
})
export class ButtonDirective implements AfterViewInit, OnChanges {

  @Input() isLoading = false;

  private _isLoading = false;
  private _savedHtml = '';

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this._isLoading = changes.isLoading.currentValue;
    if (this._isLoading === true) {
      this.setPreloader();
    } else {
      this.setHtml();
    }
  }

  setHtml() {
    if (this._savedHtml) {
      this.elementRef.nativeElement.textContent = this._savedHtml;
    }
  }

  setPreloader() {
    this._savedHtml = this.elementRef.nativeElement.textContent;
    this.elementRef.nativeElement.innerHTML = `<div class="spinner-container">
  <div class="mat-spinner mat-progress-spinner mat-primary mat-progress-spinner-indeterminate-animation"
       mode="indeterminate" role="progressbar" style="width: 22px;height: 22px;">
    <svg focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100"
         style="width: 22px;height: 22px;">
      <circle cx="50%" cy="50%" r="45"
              style="animation-name: mat-progress-spinner-stroke-rotate-100; stroke-dasharray: 282.743px; stroke-width: 10%;"></circle>
    </svg>
  </div>
</div>
`;
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
