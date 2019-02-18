import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EditServiceDialogComponent} from "../edit-service-dialog/edit-service-dialog.component";
import {tap} from "rxjs/operators";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'sl-team-service-collection-item',
  templateUrl: './team-service-collection-item.component.html',
  styleUrls: ['./team-service-collection-item.component.scss']
})
export class TeamServiceCollectionItemComponent implements OnInit {

  @Input() service;
  @Input() canEdit: boolean;
  @Output() onDeleted: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dialog: MatDialog
  ) {
  }

  ngOnInit() {
  }

  showModal() {
    this.dialog.open(EditServiceDialogComponent, {data: this.service})
      .afterClosed()
      .pipe((tap((newService) => {
        if (newService) {
          if (!newService.isDeleted) {
            Object.assign(this.service, newService);
          } else {
            this.onDeleted.emit(newService.id);
          }
        }
      })))
      .subscribe();
  }
}
