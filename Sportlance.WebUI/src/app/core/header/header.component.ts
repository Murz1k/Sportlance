import {Component, Input, OnInit} from '@angular/core';
import {Paths} from '../paths';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Router} from '@angular/router';

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

  constructor(private router: Router, private deviceService: DeviceDetectorService
  ) {
  }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
  }

  changeShowMenu() {
    this.showMenu = !this.showMenu;
  }

  navigateTo(routerName: string) {
    this.router.navigate([routerName]);
    this.showMenu = false;
  }
}
