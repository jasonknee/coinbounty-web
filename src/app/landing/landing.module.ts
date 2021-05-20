import { NgModule } from '@angular/core';

import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [SharedModule, LandingRoutingModule, MatButtonModule]
})
export class LandingModule {}
