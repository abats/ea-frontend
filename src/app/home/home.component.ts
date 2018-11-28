import {Component, OnDestroy} from '@angular/core';
import {Series} from '../model/series';
import {ApiService} from '../api.service';
import {SeriesService} from '../services/series.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnDestroy {
  public spotlightSeries: Series[];
  public seriesDetail: Series;
  public trendingSeries: Series[];

  private topSeries$;
  private seriesDetail$;
  private trendingSeries$;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private seriesService: SeriesService) {

    this.topSeries$ = this.seriesService.getTopSeries().subscribe(topSeriesResponse => {
      this.spotlightSeries = topSeriesResponse.slice(0, 2);
    })

    this.trendingSeries$ = this.seriesService.getTrendingSeries().subscribe(trendingSeriesResponse => {
      this.trendingSeries = trendingSeriesResponse;
    })

    this.seriesDetail$ = this.seriesService.getSingleSeries('breaking_bad').subscribe(seriesDetailResponse => {
      this.seriesDetail = seriesDetailResponse;
    });
  }

  ngOnDestroy() {
    this.topSeries$.unsubscribe();
    this.seriesDetail$.unsubscribe();
    this.trendingSeries$.unsubscribe();
  }

}
