import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SeriesService } from '../services/series.service';
import { BrowseRoutesModule } from './browse.routes';
import { AppSharedModule } from '../app.shared.module';
import { BrowseComponent } from './browse.component';
import { SeriesListComponent } from '../series-list-view/series-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SeriesBrowseService } from '../services/browse.service';

@NgModule({
  declarations: [
    BrowseComponent,
    SeriesListComponent
  ],
  exports: [
    BrowseComponent
  ],
  imports: [
    BrowseRoutesModule,
    AppSharedModule,
    InfiniteScrollModule
  ],
  providers: [
    Title,
    SeriesService,
    SeriesBrowseService
  ]
})

export class BrowseModule {

}
