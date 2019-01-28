import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sl-team-service-collection-item',
  templateUrl: './team-service-collection-item.component.html',
  styleUrls: ['./team-service-collection-item.component.scss']
})
export class TeamServiceCollectionItemComponent implements OnInit {

  @Input() service;

  constructor() { }

  ngOnInit() {
  }
}
