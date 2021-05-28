import { Component } from '@angular/core';
import { UserService } from 'src/app/core/coinbase/user.service';

@Component({
  selector: 'cb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = "exp coin"
  userName: string = '';
  // users: [..., {userName: 'applenmonet'}];

  constructor(public userService: UserService) {
    userService.getUserObservable()
      .subscribe((user) => {
        this.userName = user.userName;
        //this.dataService.getAnalytics(user.userName);
      });

  }

  selectUser(user: any) {
    this.userService.changeUserAccount(user);
  }

  
}
