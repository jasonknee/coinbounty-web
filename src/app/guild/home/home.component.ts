import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  mission: string;
  chainCode: number;
  credits: number;
  class: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {chainCode: 1, mission: 'Collect Hydrogen from the Jabbas.', credits: 1.0079, class: 'H'},
  {chainCode: 2, mission: 'Find Helium on the Planet Zorgberg.', credits: 4.0026, class: 'He'},
  {chainCode: 3, mission: 'Attack Lithium and generate clean energy.', credits: 6.941, class: 'Li'},
  {chainCode: 4, mission: 'Battle Beryllium', credits: 9.0122, class: 'Be'},
  {chainCode: 5, mission: 'Hunt Boron', credits: 10.811, class: 'B'},
  {chainCode: 6, mission: 'Neutralize Carbon', credits: 12.0107, class: 'C'},
  {chainCode: 7, mission: 'Mix Nitrogen', credits: 14.0067, class: 'N'},
  {chainCode: 8, mission: 'Breathe Oxygen', credits: 15.9994, class: 'O'},
  {chainCode: 9, mission: 'Use Fluorine', credits: 18.9984, class: 'F'},
  {chainCode: 10, mission: 'Fly Neon', credits: 20.1797, class: 'Ne'},
];

import { CoinbaseService } from 'src/app/core/coinbase/coinbase.service';
import { BountiesService } from './guild.service';

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
    this.coinbaseService.account$.subscribe(user => {
      console.log(user);
    });
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
