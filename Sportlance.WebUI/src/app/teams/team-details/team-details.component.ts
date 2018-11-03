import {Component, OnInit} from '@angular/core';
import {TeamProfileResponse} from '../../shared/teams/responses/team-profile-response';
import {TeamsService} from '../teams.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {TeamPhotoResponse} from '../../shared/teams/responses/team-photo-response';
import {TrainerInfoResponse} from '../../shared/trainers/responses/trainer-info-response';
import {TrainersService} from '../../trainers/trainers.service';
import {GetTrainersQuery} from '../../shared/trainers/get-trainers-query';
import {Paths} from '../../core/paths';
import {MatDialog} from '@angular/material';
import {AddTeamPhotoDialogComponent} from './add-team-photo-dialog/add-team-photo-dialog.component';
import {AddTeamPhotoDialogData} from './add-team-photo-dialog/add-team-photo-dialog-data';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {

  public profile: TeamProfileResponse;
  public photos: TeamPhotoResponse[];
  public teamMembers: TrainerInfoResponse[][];
  public Paths = Paths;
  public isShowAbout = false;
  public isLoadingPhotos = false;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private titleService: Title,
              private dialog: MatDialog,
              private trainersService: TrainersService,
              private teamService: TeamsService) {
    this.profile = this.route.snapshot.data['profile'];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.updatePhotos(params['id']);
      this.upadteTeamMembers(params['id']);
    });
  }

  public showAbout() {
    this.isShowAbout = !this.isShowAbout;
  }

  public showAddTeamPhotoDialog() {
    this.dialog.open(AddTeamPhotoDialogComponent, {data: <AddTeamPhotoDialogData> {teamId: this.profile.id}})
      .afterClosed()
      .subscribe((result) => {
          if (result) {
            this.updatePhotos(this.profile.id);
          }
        }
      );
  }

  public deletePhoto(photoId: number) {
    this.teamService.deletePhoto(this.profile.id, photoId).subscribe(() => this.updatePhotos(this.profile.id));
  }

  private updatePhotos(teamId: number) {
    this.isLoadingPhotos = true;
    return this.teamService.getPhotosByTeamId(teamId).pipe(
      map((response) => {
        this.photos = response.items.map(i => <TeamPhotoResponse>{
          id: i.id,
          file: i.file !== null ? `data:image/jpg;base64,${i.file.data}` : null
        });
        this.isLoadingPhotos = false;
      }),
      catchError((error) => {
        this.isLoadingPhotos = false;
        return throwError(error);
      }))
      .subscribe();
  }

  private upadteTeamMembers(teamId: number) {
    this.trainersService.get(<GetTrainersQuery>{
      teamId: teamId,
      offset: 0,
      count: 10
    }).subscribe((response) => {
      this.teamMembers = [];
      for (let i = 0; i < response.items.length; i += 6) {
        this.teamMembers.push(response.items.slice(i, i + 6));
      }
    });
  }
}
