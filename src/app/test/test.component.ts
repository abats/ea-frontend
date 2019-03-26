import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SeriesService } from '../services/series.service';
import { Series } from '../model/series';

@Component({
  templateUrl: 'test.component.html',
})

export class TestComponent implements OnInit, OnDestroy {

  series: Series[];
  public series$;

  constructor(
    private seriesService: SeriesService
  ) {

    this.series$ = this.seriesService.getTopSeries().subscribe(series => {
      this.series = series;
    });

  }

  ngOnInit(): void {
  }


  ngOnDestroy() {
    this.series$.unsubscribe();
  }
}
