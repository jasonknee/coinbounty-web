import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CoinbaseService } from 'src/app/core/coinbase/coinbase.service';
import { config } from 'src/app/core/config';
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
    private coinbaseService: CoinbaseService) {
    this.coinbaseService.watch().subscribe((account: any) => {
      this.isLoggedIn = !!account;
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
        this.coinbaseService.set(isLoggedIn);
      }
    });
  }

  logout() {
    this.coinbaseService.set(null);
    this.router.navigateByUrl('/');
  }

  redirectToCoinbase() {
    window.location.href = this.buildUrl(config.COINBASE_CLIENT_ID, config.REDIRECT_URI);
  }

  buildUrl(clientId: string, redirectUri: string) {
    return `https://www.coinbase.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=SECURE_RANDOM&scope=wallet:accounts:read`
  }
}
