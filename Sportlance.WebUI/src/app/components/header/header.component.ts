import {Component, Input, OnInit} from '@angular/core';
import {Paths} from '../../core/paths';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() public isEmpty: false;
  public Paths = Paths;

  constructor() {
  }
}
