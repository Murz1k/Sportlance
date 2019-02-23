import {Component, ElementRef, forwardRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'sl-skills-editor',
  templateUrl: './skills-editor.component.html',
  styleUrls: ['./skills-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SkillsEditorComponent),
      multi: true,
    }
  ]
})
export class SkillsEditorComponent implements OnInit, ControlValueAccessor {

  inputString: string;

  _value = [];
  _skills = [];

  @ViewChild('input') inputElement: ElementRef;

  constructor(private _elementRef: ElementRef) {
  }

  ngOnInit() {
  }

  private propagateChange = (_: any) => {
  };

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value: any[]): void {
    this._value = value;
    this._skills = this._value;
  }

  focus() {
    this.inputElement.nativeElement.focus();
  }

  deleteSkill(skill: any) {
    this._skills = this._skills.filter(i => i !== skill);
    this._value = this._skills;
    this.propagateChange(this._value);
  }

  onKeyEnter($event) {
      $event.preventDefault();

    if (this.inputString) {
      this._skills.push({name: this.inputString});
      this.inputString = undefined;
      this._value = this._skills;
      this.propagateChange(this._value);
    }
  }
}
