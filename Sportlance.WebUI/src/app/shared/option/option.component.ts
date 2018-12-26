import {Component, ElementRef, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sl-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class SlOptionComponent implements OnInit {

  @Input() value = [];

  constructor(private _element: ElementRef<HTMLElement>) {
  }

  ngOnInit() {
  }

  get viewValue(): string {
    // TODO(kara): Add input property alternative for node envs.
    return (this._getHostElement().textContent || '').trim();
  }

  /** Gets the label to be used when determining whether the option should be focused. */
  getLabel(): string {
    return this.viewValue;
  }

  /** Gets the host DOM element. */
  _getHostElement(): HTMLElement {
    return this._element.nativeElement;
  }
}
