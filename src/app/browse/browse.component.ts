import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {SeriesService} from '../services/series.service';
import {Series} from '../model/series';
import {Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {
  private series$;
  public seriesGenres = [];
  public seriesByGenre: Series[];
  private subscription$: Subscription;
  private genre: string;
  private pageNumber = 0;

  constructor( private seriesService: SeriesService,
               private titleService: Title,
               private activatedRoute: ActivatedRoute) {


    this.subscription$ = this.activatedRoute.params.subscribe(
      (param: any) => {
        this.genre = param.genre;
        this.getSeriesByGenre(this.genre, this.pageNumber);
      });

    this.titleService.setTitle('Episode Alert - Browse series');
  }

  ngOnInit() {
    this.seriesGenres = this.seriesService.getSeriesGenres();
  }

  getSeriesByGenre(genre: string, page: number) {
    this.series$ = this.seriesService.getSeriesByGenre(genre, page).subscribe(
      (series) => {
        this.seriesByGenre  = series;
      }
    );
  }

  ngOnDestroy() {
    this.series$.unsubscribe();
  }

}
