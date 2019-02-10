import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {AuthService} from '../../core/auth/auth.service';
import {EditTeamPhotoDialogData} from './edit-team-photo-dialog/edit-team-photo-dialog-data';
import {EditTeamPhotoDialogComponent} from './edit-team-photo-dialog/edit-team-photo-dialog.component';
import {MatDialog} from '@angular/material';
import {EditTeamBackgroundDialogData} from './edit-team-background-dialog/edit-team-background-dialog-data';
import {EditTeamBackgroundDialogComponent} from './edit-team-background-dialog/edit-team-background-dialog.component';
import {TeamResponse} from '../../shared/teams/requests/team-response';
import {EditTeamAboutDialogComponent} from './edit-team-about-dialog/edit-team-about-dialog.component';

@Component({
  selector: 'sl-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {

  public team: TeamResponse;
  public isShowAbout = false;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              public authService: AuthService,
              private dialog: MatDialog,
              private titleService: Title) {
  }

  ngOnInit() {
    this.team = this.route.snapshot.data['profile'];

    this.authService.setPermissions(
      `teams:photo:edit:${this.team.id}`,
      this.authService.getCurrent().id === this.team.authorId);

    this.titleService.setTitle(`${this.team.title} | Sportlance`);
  }

  changePhoto() {
    this.dialog.open(EditTeamPhotoDialogComponent, {
      data: <EditTeamPhotoDialogData>{
        url: this.team.photoUrl,
        team: this.team
      }
    })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          Object.assign(this.team, result);
        }
      });
  }

  changeAbout() {
    this.dialog.open(EditTeamAboutDialogComponent, {data: this.team})
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          Object.assign(this.team, result);
        }
      });
  }

  changeBackground() {
    this.dialog.open(EditTeamBackgroundDialogComponent, {
      data: <EditTeamBackgroundDialogData>{
        url: this.team.backgroundUrl,
        team: this.team
      }
    })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          Object.assign(this.team, result);
        }
      });
  }

  public showAbout() {
    this.isShowAbout = !this.isShowAbout;
  }
}
