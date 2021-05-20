import {Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
  }