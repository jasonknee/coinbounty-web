import {Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

const constants = {
  COINBASE_CLIENT_ID: '4882df2a4555003756280af28b1a6a2ae51c10f08329a9c5325cf83b63ecc94f',
  REDIRECT_URI: 'http://localhost:4200/cb'
}

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'auth-dialog.component.html',
    styleUrls: ['./auth-dialog.component.scss']
  })
  export class AuthDialog {
    error: any;

    form: FormGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });


    constructor(public dialogRef: MatDialogRef<AuthDialog>) {}
  
    submit() {
      const isLoggedIn = true;
      if (this.form.valid) {
        this.dialogRef.close({ successful: isLoggedIn, payload :this.form.value });
      }
    }

    redirectToCoinbase() {
      window.location.href = this.buildUrl(constants.COINBASE_CLIENT_ID, constants.REDIRECT_URI);
    }

    buildUrl(clientId: string, redirectUri: string) {
      return `https://www.coinbase.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=SECURE_RANDOM&scope=wallet:accounts:read`
    }
  }