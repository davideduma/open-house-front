import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {

  constructor(private dialog: MatDialog) {}

   openNotificationPopup(triggerElement: HTMLElement): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.maxHeight = '600px';
    dialogConfig.position = {
      top: `${triggerElement.offsetTop + triggerElement.offsetHeight}px`,
      left: `${triggerElement.offsetLeft + 170}px`
    };
    // this.dialog.open(NotificationsComponent, dialogConfig);
  }

}
