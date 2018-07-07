import {Component, OnInit} from '@angular/core';
import {TeamProfileResponse} from '../../services/teams/responses/team-profile-response';
import {TeamsService} from '../../services/teams/teams.service';
import {ActivatedRoute} from '@angular/router';
import {TeamPhotoResponse} from '../../services/teams/responses/team-photo-response';
import {DialogService} from '../../services/dialog.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrls: ['./team-profile.component.scss']
})
export class TeamProfileComponent implements OnInit {

  public profile: TeamProfileResponse;
  public photos: any[];

  constructor(private route: ActivatedRoute,
              private dialogService: DialogService,
              private sanitizer: DomSanitizer,
              private teamService: TeamsService) {
  }

  async ngOnInit() {
    await this.route.params.forEach(async params => {
      this.updateInfoAsync(params['id']);
      this.updatePhotosAsync(params['id']);
    });
  }

  async showAddTeamPhotoDialogAsync() {
    const result = await this.dialogService.showAddTeamPhotoDialogAsync(this.profile.id);
    if (result) {
      await this.updatePhotosAsync(this.profile.id);
    }
  }

  private async updateInfoAsync(teamId: number) {
    this.profile = await this.teamService.getByIdAsync(teamId);
  }

  private async updatePhotosAsync(teamId: number) {
    const response = await this.teamService.getPhotosByTeamIdAsync(teamId);
    this.photos = response.items.map(i => `data:image/jpg;base64,${i.file.data}`);
  }
}
