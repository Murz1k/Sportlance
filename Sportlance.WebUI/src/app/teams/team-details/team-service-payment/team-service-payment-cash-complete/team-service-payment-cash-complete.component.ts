import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TeamResponse} from "../../../../shared/teams/requests/team-response";

@Component({
  selector: 'sl-team-service-payment-cash-complete',
  templateUrl: './team-service-payment-cash-complete.component.html',
  styleUrls: ['./team-service-payment-cash-complete.component.scss']
})
export class TeamServicePaymentCashCompleteComponent implements OnInit {

  team: TeamResponse;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.team = this.route.snapshot.data['team'];
  }
}
