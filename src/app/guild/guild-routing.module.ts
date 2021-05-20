import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BountiesComponent } from './bounties/bounties.component';

const routes: Routes = [
  {
    path: '',
    component: BountiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuildRoutingModule {}
