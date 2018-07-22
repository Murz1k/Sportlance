import {Component, OnInit} from '@angular/core';
import {TeamProfileResponse} from '../../services/teams/responses/team-profile-response';
import {TeamsService} from '../../services/teams/teams.service';
import {ActivatedRoute} from '@angular/router';
import {DialogService} from '../../services/dialog.service';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {TeamPhotoResponse} from '../../services/teams/responses/team-photo-response';
import {PartialObserver} from "rxjs/internal/types";
import {Observable} from "rxjs/internal/Observable";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrls: ['./team-profile.component.scss']
})
export class TeamProfileComponent implements OnInit {

  public profile: TeamProfileResponse;
  public photos: any[][];

  constructor(private route: ActivatedRoute,
              private dialogService: DialogService,
              private sanitizer: DomSanitizer,
              private titleService: Title,
              private teamService: TeamsService) {
  }

  async ngOnInit() {
    await this.route.params.forEach(async params => {
      this.updateInfoAsync(params['id']);
      this.updatePhotos(params['id']);
      this.upadteTeamMembersAsync(params['id']);
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

  private async upadteTeamMembersAsync(teamId: number) {

  }
}
