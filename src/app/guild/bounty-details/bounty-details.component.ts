import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bounty } from '../shared/bounty';
@Component({
  selector: 'cb-guild-bounty-details',
  templateUrl: './bounty-details.component.html'
})
export class BountyDetailsComponent {
  bounty?: Bounty;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // console.log(this.router.getCurrentNavigation()?.extras.state);
  }

  ngOnInit() {
    // console.log(history.state);
    this.bounty = history.state;
  }
}
