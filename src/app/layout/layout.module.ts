import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VerticalComponent } from './vertical/vertical.component';


@NgModule({
  declarations: [
    NavbarComponent,
    VerticalComponent,
    ContentComponent,
    FooterComponent
  ],
  imports: [
    RouterModule
  ],
  exports: [
    VerticalComponent
  ]
})
export class LayoutModule { }
