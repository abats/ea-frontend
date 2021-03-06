import { NgModule } from '@angular/core';
import {GuideComponent} from './guide.component';
import {SeriesService} from '../services/series.service';
import {GuideRoutingModule} from './guide.routes';
import {CommonModule} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NumberPadderPipe} from '../pipes';
import {AppSharedModule} from '../app.shared.module';

@NgModule({
  declarations: [
    GuideComponent,
    NumberPadderPipe
  ],
  exports: [
    GuideComponent,
  ],
  imports: [
    GuideRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppSharedModule
  ],
  providers: [
    Title,
    SeriesService
  ]
})

export class GuideModule {

}
