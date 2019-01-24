import {Component, OnDestroy} from '@angular/core';
import { ApiService } from './api.service';
import { SeriesService } from './services/series.service';
import { Series } from './model/series';
import {AuthService} from './services/auth.service';
import {RouterOutlet} from '@angular/router';
import {fadeAnimation} from './annimations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeAnimation
    // animation triggers go here
  ]
})

export class AppComponent implements OnDestroy {
  public topSeries: Array<Series> = [];
  public seriesDetail: Series;

  private topSeries$;
  private seriesDetail$;

  constructor(
    private apiService: ApiService,
    public authService: AuthService,
    private seriesService: SeriesService) {
      this.topSeries$ = this.seriesService.getTopSeries().subscribe(topSeriesResponse => {
        this.topSeries = topSeriesResponse;
      });

      this.seriesDetail$ = this.seriesService.getSingleSeries('breaking_bad').subscribe(seriesDetailResponse => {
        this.seriesDetail = seriesDetailResponse;
      });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnDestroy() {
    this.topSeries$.unsubscribe();
  }

}
