import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { CoinbaseAuthService } from 'src/app/core/coinbase/coinbase-auth.service';
import { CoinbaseService } from 'src/app/core/coinbase/coinbase.service';
import { Bounty } from '../shared/bounty';
import { BountiesService } from './guild.service';

const ELEMENT_DATA: Bounty[] = [
  { id: '', chainCode: 1, missionObjective: 'Collect Hydrogen from the Jabbas.', credits: 1.0079, class: 'H', reward: { amount: 1, currency: "BTC"} },
  { id: '', chainCode: 2, missionObjective: 'Find Helium on the Planet Zorgberg.', credits: 4.0026, class: 'He', reward: { amount: 1, currency: "BTC"} },
  { id: '', chainCode: 3, missionObjective: 'Attack Lithium and generate clean energy.', credits: 6.941, class: 'Li', reward: { amount: 1, currency: "BTC"} },
  { id: '', chainCode: 4, missionObjective: 'Battle Beryllium', credits: 9.0122, class: 'Be', reward: { amount: 1, currency: "BTC"} },
  { id: '', chainCode: 5, missionObjective: 'Hunt Boron', credits: 10.811, class: 'B', reward: { amount: 1, currency: "BTC"} },
  { id: '', chainCode: 6, missionObjective: 'Neutralize Carbon', credits: 12.0107, class: 'C', reward: { amount: 1, currency: "BTC"} },
  { id: '', chainCode: 7, missionObjective: 'Mix Nitrogen', credits: 14.0067, class: 'N', reward: { amount: 1, currency: "BTC"} },
  { id: '', chainCode: 8, missionObjective: 'Breathe Oxygen', credits: 15.9994, class: 'O', reward: { amount: 1, currency: "BTC"} },
  { id: '', chainCode: 9, missionObjective: 'Use Fluorine', credits: 18.9984, class: 'F', reward: { amount: 1, currency: "BTC"} },
  { id: '', chainCode: 10, missionObjective: 'Fly Neon', credits: 20.1797, class: 'Ne', reward: { amount: 1, currency: "BTC"} },
];

@Component({
  selector: 'cb-guild-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [BountiesService]
})
export class GuildHomeComponent implements AfterViewInit, OnInit {
  title = "exp coin"
  message: string = "";
  @ViewChild(MatSort) sort?: MatSort;

  constructor(private coinbaseService: CoinbaseService, private bounties: BountiesService) {
    // this.coinbaseService.user$.subscribe(user => {
    //   console.log(user);
    // });
    this.bounties.sayHello().subscribe((payload: any) => {
      console.log(payload);
      this.message = payload.message;
    })
  }
  displayedColumns: string[] = ['chainCode', 'mission', 'credits', 'class'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  async ngOnInit() {
    // const accounts = await this.coinbaseService.getAccounts();
    // console.log(accounts);
    const transactions = await this.coinbaseService.getTransactions();
    console.log(transactions);
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
}
