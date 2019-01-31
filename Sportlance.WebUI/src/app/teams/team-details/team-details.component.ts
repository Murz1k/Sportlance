import {Component, OnInit} from '@angular/core';
import {TeamProfileResponse} from '../../shared/teams/responses/team-profile-response';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'sl-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {

  public team: TeamProfileResponse;
  public isShowAbout = false;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              public authService: AuthService,
              private titleService: Title) {
  }

  ngOnInit() {
    this.team = this.route.snapshot.data['profile'];

    this.authService.setPermissions(
      `teams:photo:edit:${this.team.id}`,
      this.authService.getCurrent().id === this.team.authorId);

    this.titleService.setTitle(`${this.team.title} | Sportlance`);
  }

  public showAbout() {
    this.isShowAbout = !this.isShowAbout;
  }
}
