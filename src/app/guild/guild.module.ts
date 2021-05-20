import { NgModule } from '@angular/core';

import { GuildRoutingModule } from './guild-routing.module';
import { BountiesComponent } from './bounties/bounties.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    BountiesComponent
  ],
  imports: [SharedModule, GuildRoutingModule, MatButtonModule, MatSortModule, MatTableModule, MatCardModule]
})
export class GuildModule {}
