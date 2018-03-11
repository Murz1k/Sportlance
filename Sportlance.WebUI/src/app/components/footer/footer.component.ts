import { Component, OnInit } from '@angular/core';
import {WeekDay} from "@angular/common";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  startDate: number = 2018;

  endDate: number;

  constructor() {
    this.endDate = (new Date()).getFullYear();
  }

  ngOnInit() {
  }

}
