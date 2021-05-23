import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinbaseCallbackComponent } from './core/coinbase/callback.component';
import { CoinbaseCallbackGuard } from './core/coinbase/callback.guard';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./landing/landing.module').then(mod => mod.LandingModule)
  },
  {
    path: 'guild',
    loadChildren: () =>
      import('./guild/guild.module').then(mod => mod.GuildModule),
      canActivate: [AuthGuard]
  },
  {
    path: 'callback',
    component: CoinbaseCallbackComponent,
    canActivate: [CoinbaseCallbackGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
