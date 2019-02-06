import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {SeriesService} from '../services/series.service';
import {AuthService} from '../services/auth.service';
import {MyshowsComponent} from './myshows.component';
import {MyshowRoutingModule} from './myshows.routes';
import {AppSharedModule} from '../app.shared.module';
import {BadgeComponent} from './badge/badge.component';
import {OrderDisplayComponent} from './orderDisplay/orderdisplay.component';
import {SortablejsModule} from 'angular-sortablejs';

@NgModule({
  declarations: [
    MyshowsComponent,
    BadgeComponent,
    OrderDisplayComponent
  ],
  exports: [
    MyshowsComponent
  ],
  imports: [
    MyshowRoutingModule,
    AppSharedModule,
    SortablejsModule
  ],
  providers: [
    Title,
    SeriesService,
    AuthService
  ]
})

export class MyshowsModule {

}
