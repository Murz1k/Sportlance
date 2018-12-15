import {Component} from '@angular/core';
import {TeamResponse} from '../../shared/teams/requests/team-response';
import {ActivatedRoute} from '@angular/router';
import {CollectionResponse} from '../../core/collection-response';
import {Paths} from '../../core/paths';

@Component({
  selector: 'sl-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.scss']
})
export class MyTeamsComponent {

  Paths = Paths;
  public teams: TeamResponse[] = [];

  constructor(private route: ActivatedRoute) {
    this.teams = (this.route.snapshot.data['teams'] as CollectionResponse<TeamResponse>).items;
  }
}
