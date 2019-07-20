import {Component, OnDestroy} from '@angular/core';
import {Series} from '../model/series';
import {SeriesService} from '../services/series.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnDestroy {
  public spotlightSeries: Series[];
  public trendingSeries: Series[];
  public editorPicks: Series[];

  private topSeries$;
  private trendingSeries$;

  constructor(
    public authService: AuthService,
    private seriesService: SeriesService) {

    this.topSeries$ = this.seriesService.getTopSeries().subscribe(topSeriesResponse => {
      let amountOfSpotLightShows = 2;

      if (!this.authService.isLoggedIn()) {
        amountOfSpotLightShows = 1;
      }

      this.spotlightSeries = topSeriesResponse.slice(0, amountOfSpotLightShows);
      this.editorPicks = topSeriesResponse.slice(2, 5);

    });

    this.trendingSeries$ = this.seriesService.getTrendingSeries().subscribe(trendingSeriesResponse => {
      this.trendingSeries = trendingSeriesResponse;
    });
  }

  ngOnDestroy() {
    this.topSeries$.unsubscribe();
    this.trendingSeries$.unsubscribe();
  }

}
