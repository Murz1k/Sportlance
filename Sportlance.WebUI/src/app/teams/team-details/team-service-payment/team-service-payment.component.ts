import { Component, OnInit } from '@angular/core';
import {TeamServiceResponse} from "../../../shared/teams/responses/team-service-response";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'sl-team-service-payment',
  templateUrl: './team-service-payment.component.html',
  styleUrls: ['./team-service-payment.component.scss']
})
export class TeamServicePaymentComponent implements OnInit {

  teamService: TeamServiceResponse;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.teamService = this.route.snapshot.data['teamService'];
    console.log(this.teamService);
  }
}
