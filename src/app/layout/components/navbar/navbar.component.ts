import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialog } from '../auth-dialog/auth-dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'cb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  animal: string = '';
  name: string = '';

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AuthDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
