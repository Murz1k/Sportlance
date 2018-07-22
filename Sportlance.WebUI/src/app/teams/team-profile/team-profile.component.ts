import {Component, OnInit} from '@angular/core';
import {TeamProfileResponse} from '../../services/teams/responses/team-profile-response';
import {TeamsService} from '../../services/teams/teams.service';
import {ActivatedRoute} from '@angular/router';
import {DialogService} from '../../services/dialog.service';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {TeamPhotoResponse} from '../../services/teams/responses/team-photo-response';
import {TrainerInfoResponse} from '../../services/trainers/responses/trainer-info-response';
import {TrainersService} from '../../services/trainers/trainers.service';
import {GetTrainersQuery} from '../../services/trainers/get-trainers-query';
import {Paths} from "../../core/paths";

@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrls: ['./team-profile.component.scss']
})
export class TeamProfileComponent implements OnInit {

  public profile: TeamProfileResponse;
  public photos: TeamPhotoResponse[][];
  public teamMembers: TrainerInfoResponse[][];
  public Paths = Paths;

  constructor(private route: ActivatedRoute,
              private dialogService: DialogService,
              private sanitizer: DomSanitizer,
              private titleService: Title,
              private trainersService: TrainersService,
              private teamService: TeamsService) {
  }

  async ngOnInit() {
    await this.route.params.forEach(async params => {
      this.updateInfoAsync(params['id']);
      this.updatePhotos(params['id']);
      this.upadteTeamMembers(params['id']);
    });
  }

  async showAddTeamPhotoDialogAsync() {
    const result = await this.dialogService.showAddTeamPhotoDialogAsync(this.profile.id);
    if (result) {
      this.updatePhotos(this.profile.id);
    }
  }

  private async updateInfoAsync(teamId: number) {
    this.profile = await this.teamService.getByIdAsync(teamId);
    this.titleService.setTitle(`${this.profile.title} | Sportlance`);
  }

  public deletePhoto(photoId: number) {
    this.teamService.deletePhoto(this.profile.id, photoId).subscribe(() => this.updatePhotos(this.profile.id));
  }

  private updatePhotos(teamId: number) {
    return this.teamService.getPhotosByTeamId(teamId).subscribe((response) => {
      const allPhotos = response.items.map(i => <TeamPhotoResponse>{
        id: i.id,
        file: `data:image/jpg;base64,${i.file.data}`
      });
      this.photos = [];
      for (let i = 0; i < allPhotos.length; i += 6) {
        this.photos.push(allPhotos.slice(i, i + 6));
      }
    });
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
