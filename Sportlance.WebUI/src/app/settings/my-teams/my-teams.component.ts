import {Component, OnInit} from '@angular/core';
import {User} from '../../services/user.service/user';
import {UserService} from '../../services/user.service/user.service';
import {Paths} from '../../core/paths';
import {TeamResponse} from '../../services/teams/requests/team-response';
import {TeamsService} from '../../services/teams/teams.service';
import {GetTeamQuery} from '../../services/teams/requests/get-team-query';

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.scss']
})
export class MyTeamsComponent implements OnInit {

  public account: User;
  public Paths = Paths;
  public teams: TeamResponse[] = [];

  constructor(private userService: UserService,
              private teamService: TeamsService) {
    this.account = this.userService.getCurrent();
  }

  ngOnInit() {
    if (this.account.isTrainer || this.account.isTeam) {
      this.teamService.getSelf(<GetTeamQuery>{
        count: 10,
        offset: 0
      }).subscribe((response) => {
        this.teams = response.items;
      });
    }
  }
}
