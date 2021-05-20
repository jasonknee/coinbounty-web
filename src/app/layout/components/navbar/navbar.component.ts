import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';
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
  isLoggedIn: boolean = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService) {
      this.userService.watch().subscribe((user: any) => {
        console.log(user);
        this.isLoggedIn  = user?.successful;
      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AuthDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigateByUrl('/guild');
        this.userService.set(isLoggedIn);
      }
    });
  }

  logout() {
    this.userService.set(null);
    this.router.navigateByUrl('/');
  }
}
