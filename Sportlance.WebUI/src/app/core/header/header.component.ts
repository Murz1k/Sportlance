import {Component, Input, OnInit} from '@angular/core';
import {Paths} from '../paths';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() public isEmpty: false;
  public Paths = Paths;

  public isMobile = false;

  public showMenu = false;

  constructor(private deviceService: DeviceDetectorService
  ) {
  }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
  }

  changeShowMenu() {
    this.showMenu = !this.showMenu;
  }
}
