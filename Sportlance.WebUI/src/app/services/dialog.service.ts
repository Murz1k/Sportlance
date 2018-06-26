import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ComponentType} from '@angular/cdk/portal';
import {EditTrainerAboutDialogComponent} from '../components/common/edit-trainer-about-dialog/edit-trainer-about-dialog.component';
import {EditTrainerAboutDialogData} from '../components/common/edit-trainer-about-dialog/edit-trainer-about-dialog-data';
import {EditPhotoDialogComponent} from '../components/common/edit-photo-dialog/edit-photo-dialog.component';
import {EditPhotoDialogData} from '../components/common/edit-photo-dialog/edit-photo-dialog-data';
import {EditTrainerPaidDialogComponent} from "../components/common/edit-trainer-paid-dialog/edit-trainer-paid-dialog.component";
import {EditTrainerPaidDialogData} from "../components/common/edit-trainer-paid-dialog/edit-trainer-paid-dialog-data";
import {EditAccountInfoDialogComponent} from "../components/common/edit-account-info-dialog/edit-account-info-dialog.component";
import {EditPasswordDialogComponent} from "../components/common/edit-password-dialog/edit-password-dialog.component";

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

  public showEditAccountInfoDialogAsync(): Promise<boolean> {
    return this.openModal(EditAccountInfoDialogComponent, {}, false, '600px')
      .afterClosed()
      .toPromise<boolean>();
  }

  public showEditPasswordDialogAsync(): Promise<boolean> {
    return this.openModal(EditPasswordDialogComponent, {}, false, '600px')
      .afterClosed()
      .toPromise<boolean>();
  }

  public showEditPhotoDialogAsync(url: string): Promise<File> {
    return this.openModal(EditPhotoDialogComponent, <EditPhotoDialogData> {url: url}, false, '360px')
      .afterClosed()
      .toPromise<File>();
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
