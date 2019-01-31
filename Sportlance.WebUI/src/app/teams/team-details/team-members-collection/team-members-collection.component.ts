import {Component, Input, OnInit} from '@angular/core';
import {TrainerInfoResponse} from "../../../shared/trainers/responses/trainer-info-response";
import {GetTrainersQuery} from "../../../shared/trainers/get-trainers-query";
import {Title} from "@angular/platform-browser";
import {TrainersService} from "../../../trainers/trainers.service";

@Component({
  selector: 'sl-team-members-collection',
  templateUrl: './team-members-collection.component.html',
  styleUrls: ['./team-members-collection.component.scss']
})
export class TeamMembersCollectionComponent implements OnInit {

  @Input() teamId: number;

  public teamMembers: TrainerInfoResponse[][];

  constructor(private trainersService: TrainersService) { }

  ngOnInit() {
    this.updateTeamMembers(this.teamId);
  }

  private updateTeamMembers(teamId: number) {
    this.trainersService.get(<GetTrainersQuery>{
      teamId: teamId,
      offset: 0,
      count: 10
    }).subscribe((response) => {
      this.teamMembers = [];
      for (let i = 0; i < response.items.length; i += 6) {
        this.teamMembers.push(response.items.slice(i, i + 6));
      }
    });
  }
}
