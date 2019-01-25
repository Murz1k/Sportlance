import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sl-team-service-collection',
  templateUrl: './team-service-collection.component.html',
  styleUrls: ['./team-service-collection.component.scss']
})
export class TeamServiceCollectionComponent implements OnInit {

  @Input() teamId: number;

  teamServices = [];

  constructor() {
  }

  ngOnInit() {
    this.teamServices = [
      {title: 'Абонемент 12', description: 'прикольно', price: 50000, period: '12 месяцев'},
      {title: 'Абонемент 12', description: 'прикольно', price: 50000, period: '12 месяцев'},
      {title: 'Абонемент 12', description: 'прикольно', price: 50000, period: '12 месяцев'},
      {title: 'Абонемент 12', description: 'прикольно', price: 50000, period: '12 месяцев'},
      {title: 'Абонемент 12', description: 'прикольно', price: 50000, period: '12 месяцев'},
      {title: 'Абонемент 12', description: 'прикольно', price: 50000, period: '12 месяцев'},
      {title: 'Абонемент 12', description: 'прикольно', price: 50000, period: '12 месяцев'},
      {title: 'Абонемент 12', description: 'прикольно', price: 50000, period: '12 месяцев'},
      {title: 'Абонемент 12', description: 'прикольно', price: 50000, period: '12 месяцев'}
    ];
  }
}
