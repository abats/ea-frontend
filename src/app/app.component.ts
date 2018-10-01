import {Component, OnDestroy} from '@angular/core';
import { ApiService } from './api.service';
import { SeriesService } from './services/series.service';
import { Series } from './model/series';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {
  public topSeries: Array<Series> = [];
  public seriesDetail: Series;

  private topSeries$;
  private seriesDetail$;

  constructor(
    private apiService: ApiService,
    private seriesService: SeriesService) {
      this.topSeries$ = this.seriesService.getTopSeries().subscribe(topSeriesResponse => {
        this.topSeries = topSeriesResponse;
      })

      this.seriesDetail$ = this.seriesService.getSingleSeries('breaking_bad').subscribe(seriesDetailResponse => {
        this.seriesDetail = seriesDetailResponse;
      });
  }

  ngOnDestroy() {
    this.topSeries$.unsubscribe();
  }

}
