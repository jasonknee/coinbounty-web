import { NgModule } from '@angular/core';

import { GuildRoutingModule } from './guild-routing.module';
import { GuildHomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { BountyCreateComponent } from './bounty-create/bounty-create.component';
import { BountyDetailsComponent } from './bounty-details/bounty-details.component';

@NgModule({
  declarations: [
    GuildHomeComponent,
    BountyCreateComponent,
    BountyDetailsComponent
  ],
  imports: [ 
    MatButtonModule, 
    MatSortModule, 
    MatTableModule, 
    MatCardModule, 
    HttpClientModule,
    SharedModule, 
    GuildRoutingModule,
  ]
})
export class GuildModule {}
