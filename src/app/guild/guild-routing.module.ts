import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuildHomeComponent } from './home/home.component';
import { BountyCreateComponent } from './bounty-create/bounty-create.component';
import { BountyDetailsComponent } from './bounty-details/bounty-details.component';

const routes: Routes = [
  {
    path: '',
    component: GuildHomeComponent
  },
  {
    path: 'bounty-create',
    component: BountyCreateComponent
  },
  {
    path: 'bounty/:id',
    component: BountyDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuildRoutingModule {}
