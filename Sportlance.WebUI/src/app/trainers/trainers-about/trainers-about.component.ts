import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'sl-trainers-about',
  templateUrl: './trainers-about.component.html',
  styleUrls: ['./trainers-about.component.scss']
})
export class TrainersAboutComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle(`О тренерах в Sportlance`);
  }
}
