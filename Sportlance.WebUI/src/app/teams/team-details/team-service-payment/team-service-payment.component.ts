import {Component, OnInit} from '@angular/core';
import {TeamServiceResponse} from "../../../shared/teams/responses/team-service-response";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TeamsService} from "../../teams.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'sl-team-service-payment',
  templateUrl: './team-service-payment.component.html',
  styleUrls: ['./team-service-payment.component.scss']
})
export class TeamServicePaymentComponent implements OnInit {

  teamService: TeamServiceResponse;
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private teamsService: TeamsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.teamService = this.route.snapshot.data['teamService'];

    this.form = this.formBuilder.group({
      paymentType: [undefined, [Validators.required]],
    });
  }

  redirectToPayment() {
    this.teamsService.addTeamServiceOrder(this.teamService.teamId, this.teamService.id)
      .pipe(tap((response) => {
        if (!response.error) {
          this.router.navigate([response.id, 'cash-complete']);
        }
      }))
      .subscribe();
  }
}
