import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ComponentType} from '@angular/cdk/portal';
import {EditTrainerAboutDialogComponent} from '../trainers/edit-trainer-about-dialog/edit-trainer-about-dialog.component';
import {EditTrainerAboutDialogData} from '../trainers/edit-trainer-about-dialog/edit-trainer-about-dialog-data';
import {EditPhotoDialogComponent} from '../components/common/edit-photo-dialog/edit-photo-dialog.component';
import {EditPhotoDialogData} from '../components/common/edit-photo-dialog/edit-photo-dialog-data';
import {EditTrainerPaidDialogComponent} from '../trainers/edit-trainer-paid-dialog/edit-trainer-paid-dialog.component';
import {EditTrainerPaidDialogData} from '../trainers/edit-trainer-paid-dialog/edit-trainer-paid-dialog-data';
import {EditBackgroundDialogData} from '../components/common/edit-background-dialog/edit-background-dialog-data';
import {EditBackgroundDialogComponent} from '../components/common/edit-background-dialog/edit-background-dialog.component';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  public showEditTrainerAboutDialogAsync(about: string): Promise<boolean> {
    return this.openModalAsync(EditTrainerAboutDialogComponent, <EditTrainerAboutDialogData> {about: about});
  }

  public showEditTrainerPaidDialogAsync(paid: number): Promise<boolean> {
    return this.openModalAsync(EditTrainerPaidDialogComponent, <EditTrainerPaidDialogData> {paid: paid});
  }

  public showEditPhotoDialogAsync(url: string): Promise<boolean> {
    return this.openModalAsync(EditPhotoDialogComponent, <EditPhotoDialogData> {url: url});
  }

  public showEditBackgroundDialogAsync(url: string): Promise<boolean> {
    return this.openModalAsync(EditBackgroundDialogComponent, <EditBackgroundDialogData> {url: url});
  }

  private openModal<TComponent, TData>(componentType: ComponentType<TComponent>,
                                       data: TData,
                                       disableClose: boolean = false,
                                       width: string = null): MatDialogRef<TComponent> {
    return this.dialog.open(componentType, {disableClose: disableClose, data: data, width: width == null ? '' : width});
  }

  private openModalAsync<TComponent, TData>(componentType: ComponentType<TComponent>,
                                            data: TData,
                                            disableClose: boolean = false): Promise<any> {
    return this.openModal(componentType, data, disableClose)
      .afterClosed()
      .toPromise<any>();
  }
}
