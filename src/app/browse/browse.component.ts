import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {SeriesService} from '../services/series.service';
import {Series} from '../model/series';
import {interval, Subject, Subscription} from 'rxjs';
import {ActivatedRoute } from '@angular/router';
import {SeriesBrowseService} from '../services/browse.service';

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
  private seriesBrowseSubscription$: Subscription;
  private genre: string;
  private subject = new Subject<any>();
  private pageNumber = 0;

  constructor(private seriesService: SeriesService,
              private titleService: Title,
              private activatedRoute: ActivatedRoute,
              private seriesBrowseService: SeriesBrowseService) {

    /*
     * Subscription to the subject change (genre)
     */
    this.seriesBrowseSubscription$ = this.seriesBrowseService.search(this.subject)
      .subscribe(results => {
        if  (this.seriesByGenre) {
          this.seriesByGenre = [...this.seriesByGenre, ...<Series[]>results];
        } else {
          this.seriesByGenre = <Series[]>results;
        }
      });

    /*
     * Subscription to changes of the route param (genre in this case)
     */
    this.subscription$ = this.activatedRoute.params.subscribe(
      (param: any) => {
        if (this.genre !== param.genre) {
          // reset pageNumber and results when we switch genre
          this.pageNumber = 0;
          this.seriesByGenre = [];
          this.genre = param.genre;
        }

        this.subject.next( {genre: param.genre, page: this.pageNumber});
        this.pageNumber++;
      });

    this.titleService.setTitle('Episode Alert - Browse series');
  }

  onScroll() {
    this.subject.next({genre: this.genre, page: this.pageNumber++});
  }

  ngOnInit() {
    this.seriesGenres = this.seriesService.getSeriesGenres();
  }

  ngOnDestroy() {
    this.series$.unsubscribe();
  }

}
