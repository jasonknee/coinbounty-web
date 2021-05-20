import {Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
  
    submit() {
      if (this.form.valid) {
        console.log(this.form);
      }
    }
  }