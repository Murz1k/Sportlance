import {Component, OnInit} from '@angular/core';
import {TeamResponse} from '../../shared/teams/requests/team-response';
import {ActivatedRoute} from '@angular/router';
import {CollectionResponse} from '../../core/collection-response';
import {Paths} from '../../core/paths';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'sl-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.scss']
})
export class MyTeamsComponent implements OnInit {

  Paths = Paths;
  public teams: TeamResponse[] = [];

  constructor(private titleService: Title,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(`Мои команды | Sportlance`);
    this.teams = (this.route.snapshot.data['teams'] as CollectionResponse<TeamResponse>).items;
  }
}
