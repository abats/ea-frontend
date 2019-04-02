import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SeriesService } from '../services/series.service';
import { BrowseRoutesModule } from './browse.routes';
import { AppSharedModule } from '../app.shared.module';
import { BrowseComponent } from './browse.component';
import { SeriesListComponent } from '../series-list-view/series-list.component';

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
    AppSharedModule
  ],
  providers: [
    Title,
    SeriesService
  ]
})

export class BrowseModule {

}
