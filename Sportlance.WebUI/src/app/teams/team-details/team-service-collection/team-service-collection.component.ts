import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EditServiceDialogComponent} from "./edit-service-dialog/edit-service-dialog.component";
import {MatDialog} from "@angular/material";
import {TeamsService} from "../../teams.service";
import {tap} from "rxjs/operators";
import {TeamServiceResponse} from "../../../shared/teams/responses/team-service-response";

@Component({
  selector: 'sl-team-service-collection',
  templateUrl: './team-service-collection.component.html',
  styleUrls: ['./team-service-collection.component.scss']
})
export class TeamServiceCollectionComponent implements OnInit {

  @Input() teamId: number;

  teamServices: TeamServiceResponse[];

  constructor(private dialog: MatDialog,
              private teamsService: TeamsService
  ) {
  }

  ngOnInit() {
    this.loadData();
  }

  showModal() {
    this.dialog.open(EditServiceDialogComponent, {data: {teamId: this.teamId}})
      .afterClosed()
      .pipe((tap((newService) => {
        if (newService) {
          if (!newService.isDeleted) {
            this.teamServices.unshift(newService);
          } else {
            this.teamServices = this.teamServices.filter(i => i.id !== newService.id);
          }
        }
      })))
      .subscribe();
  }

  loadData() {
    this.teamsService.getServicesByTeamId(this.teamId)
      .pipe(tap((response) => {
        if (!response.error) {
          this.teamServices = response.items;
        } else {
          this.teamServices = [];
        }
      })).subscribe();
  }
}
