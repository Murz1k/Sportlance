import {Component, OnInit} from '@angular/core';
import {User} from '../../../services/user.service/user';
import {UserService} from '../../../services/user.service/user.service';
import {Paths} from '../../../core/paths';
import {TeamResponse} from '../../../services/teams/requests/team-response';
import {TeamsService} from '../../../services/teams/teams.service';
import {GetTeamQuery} from '../../../services/teams/requests/get-team-query';

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

  async ngOnInit() {
    if (this.account.isTrainer || this.account.isTeam) {
      const response = await this.teamService.getSelfAsync(<GetTeamQuery>{
        count: 10,
        offset: 0
      });
        this.teams = response.items;
    }
  }
}
