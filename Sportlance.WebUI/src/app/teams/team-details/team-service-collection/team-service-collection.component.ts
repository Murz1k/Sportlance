import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EditServiceDialogComponent} from "./edit-service-dialog/edit-service-dialog.component";
import {MatDialog} from "@angular/material";
import {TeamsService} from "../../teams.service";
import {tap} from "rxjs/operators";
import {TeamServiceResponse} from "../../../shared/teams/responses/team-service-response";
import {AuthService} from "../../../core/auth/auth.service";
import {any} from "codelyzer/util/function";

@Component({
  selector: 'sl-team-service-collection',
  templateUrl: './team-service-collection.component.html',
  styleUrls: ['./team-service-collection.component.scss']
})
export class TeamServiceCollectionComponent implements OnInit {

  @Input() team: TeamServiceResponse;

  teamServices: TeamServiceResponse[];
  isLoading = false;

  constructor(private dialog: MatDialog,
              private teamsService: TeamsService,
              public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.setPermissions(
      `teams:services:add:${this.team.id}`,
      this.authService.getCurrent().id === this.team.authorId);
    this.loadData();
  }

  showModal() {
    this.dialog.open(EditServiceDialogComponent, {data: {teamId: this.team.id}})
      .afterClosed()
      .pipe((tap((newService) => {
        if (newService) {
          this.teamServices.unshift(newService);
        }
      })))
      .subscribe();
  }

  deleteById(id: number) {
    this.teamServices = this.teamServices.filter(i => i.id !== id);
  }

  loadData() {
    this.isLoading = true;
    this.teamsService.getServicesByTeamId(this.team.id)
      .pipe(tap((response) => {
        if (!response.error) {
          this.teamServices = response.items;
          if (this.authService.hasPermissions(`teams:services:add:${this.team.id}`)) {
            this.teamServices.forEach((service) => {
              service.teamId = this.team.id;
            });
          }
        } else {
          this.teamServices = [];
        }
        this.isLoading = false;
      })).subscribe();
  }
}
