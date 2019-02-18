import {Component, Input, OnInit} from '@angular/core';
import {TrainerInfoResponse} from '../../../shared/trainers/responses/trainer-info-response';
import {GetTrainersQuery} from '../../../shared/trainers/get-trainers-query';
import {TrainersService} from '../../../trainers/trainers.service';
import {TeamServiceResponse} from '../../../shared/teams/responses/team-service-response';
import {AuthService} from '../../../core/auth/auth.service';

@Component({
  selector: 'sl-team-members-collection',
  templateUrl: './team-members-collection.component.html',
  styleUrls: ['./team-members-collection.component.scss']
})
export class TeamMembersCollectionComponent implements OnInit {

  @Input() team: TeamServiceResponse;

  isLoading = false;

  public teamMembers: TrainerInfoResponse[] = [];

  constructor(private trainersService: TrainersService, public authService: AuthService) {
  }

  ngOnInit() {
    this.authService.setPermissions(
      `teams:members:add:${this.team.id}`,
      this.authService.isCurrentUser(this.team.authorId));
    this.updateTeamMembers(this.team.teamId);
  }

  private updateTeamMembers(teamId: number) {
    this.isLoading = true;
    this.trainersService.get(<GetTrainersQuery>{
      teamId: teamId,
      offset: 0,
      count: 10
    }).subscribe((response) => {
      this.teamMembers = response.items;
      this.isLoading = false;
    });
  }
}
