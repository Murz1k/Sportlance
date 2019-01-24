import {Component, Input, OnInit} from '@angular/core';
import {TeamPhotoResponse} from "../../../shared/teams/responses/team-photo-response";
import {TeamsService} from "../../teams.service";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {AddTeamPhotoDialogComponent} from "./add-team-photo-dialog/add-team-photo-dialog.component";
import {AddTeamPhotoDialogData} from "./add-team-photo-dialog/add-team-photo-dialog-data";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'sl-team-photo-collection',
  templateUrl: './team-photo-collection.component.html',
  styleUrls: ['./team-photo-collection.component.scss']
})
export class TeamPhotoCollectionComponent implements OnInit {

  @Input() teamId: number;

  public isLoadingPhotos = false;
  public photos: TeamPhotoResponse[];

  constructor(
    private dialog: MatDialog,
    private teamService: TeamsService) { }

  ngOnInit() {
    this.updatePhotos(this.teamId);
  }

  public showAddTeamPhotoDialog() {
    this.dialog.open(AddTeamPhotoDialogComponent, {data: <AddTeamPhotoDialogData> {teamId: this.teamId}})
      .afterClosed()
      .subscribe((result) => {
          if (result) {
            this.updatePhotos(this.teamId);
          }
        }
      );
  }

  public deletePhoto(photoId: number) {
    this.teamService.deletePhoto(this.teamId, photoId).subscribe(() => this.updatePhotos(this.teamId));
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
