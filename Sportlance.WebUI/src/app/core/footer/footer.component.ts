import {Component, Input, OnInit} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'sl-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  startDate = 2018;

  endDate: number;

  @Input() public isEmpty: false;

  public isMobile = false;

  constructor(private deviceService: DeviceDetectorService
  ) {
  }

  ngOnInit(): void {
    this.endDate = (new Date()).getFullYear();
    this.isMobile = this.deviceService.isMobile();
  }
}
