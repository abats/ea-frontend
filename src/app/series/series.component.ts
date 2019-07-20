import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SeriesService } from '../services/series.service';
import { Series } from '../model/series';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {takeUntil} from 'rxjs/operators';

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
  componentDestroyed$: Subject<boolean> = new Subject();

  public tabs: Array<any> = [];

  subscription: Subscription;
  private series$;
  private seriesUnseenAmount$;
  private seriesCurrentSeason$;
  private currentActiveSeason;

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private seriesService: SeriesService,
    private authService: AuthService
  ) {

    titleService.setTitle('Episode Alert - Series detail');

    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        this.uniqueName = param.uniqueName;
      });

    this.series$ = this.seriesService.getSingleSeries(this.uniqueName).pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        seriesDetails => {
          this.series = seriesDetails;
          this.getSeriesInformation();
        } ,
        err => {
          console.log(err);
        });

  }

  ngOnInit(): void {
  }

  onUpdateSeen(episodesResponse) {
    /* process the response, which can be one or multiple seen episodes */
    this.getSeriesSeason(this.series.id, this.currentActiveSeason);
    this.getSeriesUnseenAmount();
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

    this.seriesCurrentSeason$ = this.seriesService.getSeriesSeason(seriesId, seasonNumber).pipe(takeUntil(this.componentDestroyed$))
      .subscribe(seriesSeason => {
      if (this.series.has_specials) {
        this.tabs[seasonNumber].content = seriesSeason;
      } else {
        this.tabs[seasonNumber - 1].content = seriesSeason;
      }
    });
  }

  public loadTab(tab): void {
    if (this.series.has_specials) {
      tab = tab;
    } else {
      tab = tab + 1;
    }

    this.getSeriesSeason(this.series.id, tab);
    this.currentActiveSeason = tab;
  }

  public setActiveTab(index: number): void {
    this.tabs[index].active = true;
  }

  public getSeriesUnseenAmount() {
    let unseenAmountSeasons: number;
    if (this.series.has_specials) {
      unseenAmountSeasons = this.series.season_amount - 1;
    } else {
      unseenAmountSeasons = this.series.season_amount;
    }
    this.seriesUnseenAmount$ = this.seriesService.getUnseenAmountBySeries( this.series.id, unseenAmountSeasons)
      .pipe(takeUntil(this.componentDestroyed$)).subscribe(
      (unseenAmount) => {
        this.seriesUnseenAmount = unseenAmount;

        if (this.series.has_specials) {
          this.seriesUnseenAmount.unshift('specials');
        }
      }
    );
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
