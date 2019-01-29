import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../../core/auth/auth.service";
import {EditServiceDialogComponent} from "../edit-service-dialog/edit-service-dialog.component";
import {map} from "rxjs/operators";
import {MatDialog} from "@angular/material";
import {TeamsService} from "../../../teams.service";

@Component({
  selector: 'sl-team-service-collection-item',
  templateUrl: './team-service-collection-item.component.html',
  styleUrls: ['./team-service-collection-item.component.scss']
})
export class TeamServiceCollectionItemComponent implements OnInit {

  @Input() service;
  @Input() teamId;

  public currentId: number;

  constructor(private dialog: MatDialog,
              private authService: AuthService
  ) {
    this.currentId = this.authService.getCurrent().id;
  }

  ngOnInit() {
  }

  showModal() {
    this.service.teamId = this.teamId;
    this.dialog.open(EditServiceDialogComponent, {data: this.service})
      .afterClosed()
      .pipe((map((newService) => {
        if (newService) {
          Object.assign(this.service, newService);
        }
      })))
      .subscribe();
  }
}
