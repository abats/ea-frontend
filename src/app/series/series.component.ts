import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SeriesService } from '../services/series.service';
import { Series } from '../model/series';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: 'series.component.html',
  styleUrls: [
    'series.component.scss'
  ]
})

export class SeriesComponent implements OnInit, OnDestroy {

  series: Series;
  uniqueName: string;
  seriesUnseenAmount: Array<any>;

  public tabs: Array<any> = [];

  subscription: Subscription;
  private series$;
  private seriesSeason$;
  private seriesUnseenAmount$;
  private seriesCurrentSeason$;

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private seriesService: SeriesService
  ) {

    titleService.setTitle('Episode Alert - Series detail');

    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        this.uniqueName = param.uniqueName;
      });

    this.series$ = this.seriesService.getSingleSeries(this.uniqueName).subscribe(seriesDetails => {
      this.series = seriesDetails;
      this.getSeriesInformation();
    });

  }

  ngOnInit(): void {
  }

  createSeriesSeasonTabs(seasonAmount) {

    // don't judge me for this code

    if (this.series.has_specials) {
      for (let i = 0; i < seasonAmount; i++) {

        if (this.series.has_specials && i === 0) {
          this.tabs.push({title: 'Specials', content: [], active: false});
        } else {
          this.tabs.push({title: 'Season ' + i, content: [], active: false});
        }
      }
    } else {
      for (let i = 0; i < seasonAmount; i++) {
        this.tabs.push({title: 'Season ' + (i + 1), content: [], active: false});
      }

    }

  }

  setTitle(seriesTitle) {
    this.titleService.setTitle(seriesTitle + ' | ' + 'Episode Alert');
  }

  getSeriesInformation() {
      this.getSeriesUnseenAmount();
      this.createSeriesSeasonTabs(this.series.season_amount);
      this.getSeriesSeason(this.series.id, 1 );
      this.setTitle(this.series.name);

      if (this.series.has_specials) {
        this.setActiveTab(this.series.last_seen_season);
      } else {
        this.setActiveTab(this.series.last_seen_season - 1);
      }
  }

  getSeriesSeason(seriesId: number, seasonNumber: number) {

    this.seriesCurrentSeason$ = this.seriesService.getSeriesSeason(seriesId, seasonNumber).subscribe(seriesSeason => {
      if (this.series.has_specials) {
        this.tabs[seasonNumber].content = seriesSeason;
      } else {
        this.tabs[seasonNumber - 1].content = seriesSeason;
      }
    });
  }

  public loadTab(tab): void {
    if (this.series.has_specials) {
      this.getSeriesSeason(this.series.id, tab);
    } else {
      this.getSeriesSeason(this.series.id, tab + 1);
    }
  }

  public setActiveTab(index: number): void {
    this.tabs[index].active = true;
  }

  public getSeriesUnseenAmount() {
    this.seriesUnseenAmount$ = this.seriesService.getUnseenAmountBySeries( this.series.id, 5).subscribe(
      (unseenAmount) => {
        this.seriesUnseenAmount = unseenAmount;

        if (this.series.has_specials) {
          this.seriesUnseenAmount.unshift('specials');
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.series$.unsubscribe();
    // this.seriesSeason$.unsubscribe();
    this.seriesUnseenAmount$.unsubscribe();
    this.seriesCurrentSeason$.unsubscribe();
  }
}