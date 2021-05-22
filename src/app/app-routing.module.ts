import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
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
    path: 'cb',
    component: CallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
