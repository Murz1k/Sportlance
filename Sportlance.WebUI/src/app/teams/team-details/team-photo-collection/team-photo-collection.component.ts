import {Component, Input, OnInit} from '@angular/core';
import {TeamPhotoResponse} from '../../../shared/teams/responses/team-photo-response';
import {TeamsService} from '../../teams.service';
import {catchError, map, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AddTeamPhotoDialogComponent} from './add-team-photo-dialog/add-team-photo-dialog.component';
import {AddTeamPhotoDialogData} from './add-team-photo-dialog/add-team-photo-dialog-data';
import {MatDialog} from '@angular/material';
import {AuthService} from '../../../core/auth/auth.service';
import {TeamResponse} from '../../../shared/teams/requests/team-response';

@Component({
  selector: 'sl-team-photo-collection',
  templateUrl: './team-photo-collection.component.html',
  styleUrls: ['./team-photo-collection.component.scss']
})
export class TeamPhotoCollectionComponent implements OnInit {

  @Input() team: TeamResponse;

  public isLoadingPhotos = false;
  public photos: TeamPhotoResponse[] = [];

  constructor(
    private dialog: MatDialog,
    public authService: AuthService,
    private teamService: TeamsService) {
  }

  ngOnInit() {
    this.authService.setPermissions(
      `teams:photos:add:${this.team.id}`,
      this.authService.isCurrentUser(this.team.authorId));
    this.updatePhotos(this.team.id);
  }

  public showAddTeamPhotoDialog() {
    this.dialog.open(AddTeamPhotoDialogComponent, {data: <AddTeamPhotoDialogData>{teamId: this.team.id}})
      .afterClosed()
      .subscribe((result) => {
          if (result) {
            this.updatePhotos(this.team.id);
          }
        }
      );
  }

  public deletePhoto(photoId: number) {
    this.teamService.deletePhoto(this.team.id, photoId)
      .pipe(tap((response) => {
        if (!response) {
          this.photos = this.photos.filter(i => i.id !== photoId);
        }
      }))
      .subscribe();
  }

  private updatePhotos(teamId: number) {
    this.isLoadingPhotos = true;
    return this.teamService.getPhotosByTeamId(teamId).pipe(
      map((response) => {
        this.photos = response.items;
        this.isLoadingPhotos = false;
      }),
      catchError((error) => {
        this.isLoadingPhotos = false;
        return throwError(error);
      }))
      .subscribe();
  }
}
