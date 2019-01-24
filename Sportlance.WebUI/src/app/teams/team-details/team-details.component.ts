import {Component, OnInit} from '@angular/core';
import {TeamProfileResponse} from '../../shared/teams/responses/team-profile-response';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {TrainerInfoResponse} from '../../shared/trainers/responses/trainer-info-response';
import {TrainersService} from '../../trainers/trainers.service';
import {GetTrainersQuery} from '../../shared/trainers/get-trainers-query';
import {Paths} from '../../core/paths';

@Component({
  selector: 'sl-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {

  public profile: TeamProfileResponse;
  public Paths = Paths;
  public isShowAbout = false;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private titleService: Title) {
  }

  ngOnInit() {
    this.profile = this.route.snapshot.data['profile'];

    this.titleService.setTitle(`${this.profile.title} | Sportlance`);
  }

  public showAbout() {
    this.isShowAbout = !this.isShowAbout;
  }
}
