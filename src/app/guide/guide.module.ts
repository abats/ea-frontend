import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {GuideComponent} from './guide.component';
import {SeriesService} from '../services/series.service';
import {AuthService} from '../services/auth.service';
import {GuideRoutingModule} from './guide.routes';

@NgModule({
  declarations: [
    GuideComponent,
  ],
  exports: [
    GuideComponent
  ],
  imports: [
    GuideRoutingModule
  ],
  providers: [
    Title,
    SeriesService,
    AuthService
  ]
})

export class GuideModule {

}
