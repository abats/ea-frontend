import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Series } from '../model/series';
import { Episode } from '../model/episode';

const API_URL = environment.apiUrl;

@Injectable()
export class SeriesService {

  private baseUrl: string;
  private singleSeriesUrl: string;
  private singleSeasonUrl: string;
  private topSeriesUrl: string;
  private spotlightSeriesUrl: string;
  private trendingSeriesUrl: string;
  private profileUrl: string;
  private statsUrl: string;
  private followUrl: string;
  private unfollowUrl: string;
  private seenUrl: string;
  private unseenUrl: string;
  private unseenAmountBySeries: string;
  private seriesProfileOrderURL: string;
  private guideUrl: string;
  private guideUrlDay: string;
  private seriesByGenre: string;

  constructor( private http: HttpClient ) {
    this.baseUrl = API_URL;
    this.seriesProfileOrderURL =  this.baseUrl + '/profile/order';
    this.topSeriesUrl = this.baseUrl + '/series/top';
    this.trendingSeriesUrl = this.baseUrl + '/series/trending';
    // TODO: Change when we have spotlight
    this.spotlightSeriesUrl = this.baseUrl + '/series/top';
    this.profileUrl = this.baseUrl + '/profile/following';
    this.statsUrl = this.baseUrl + '/profile/stats';
    this.singleSeriesUrl = this.baseUrl + '/series/';
    this.guideUrl = this.baseUrl + '/series/guide/';
    this.seriesByGenre = this.baseUrl + '/series/genre/';
    this.guideUrlDay = this.baseUrl + '/series/episodesperdate/'
    this.singleSeasonUrl = this.baseUrl + '/series/episodesbyseason/';
    this.followUrl = this.baseUrl + '/follow/';
    this.unfollowUrl = this.baseUrl + '/unfollow/';
    this.unseenUrl = this.baseUrl + '/series/unseen/';
    this.seenUrl = this.baseUrl + '/series/seen/';
    this.unseenAmountBySeries = this.baseUrl + '/series/unseenamountbyseries/';
  }


  getTopSeries(): Observable<Series[]> {
    return this.http.get<Series[]>(this.topSeriesUrl);
  }

  getSeriesGenres() {
    return [{'genre' : 'action'}, {'genre' : 'adventure'}, {'genre' : 'animation'}, {'genre' : 'comedy'}
      , {'genre' : 'children'}, {'genre' : 'crime'}, {'genre' : 'drama'}, {'genre' : 'documentary'}
      , {'genre' : 'fantasy'}, {'genre' : 'mystery'}, {'genre' : 'game Show'}, {'genre' : 'horror'}
      , {'genre' : 'news'}, {'genre' : 'reality'}, {'genre' : 'science-fiction'}, {'genre' : 'soap'}
      , {'genre' : 'sport'}, {'genre' : 'talk show'}, {'genre' : 'western'}, {'genre' : 'travel'}, {'genre' : 'romance'}];
  }

  getSeriesSeason(seriesId, seriesSeason): Observable<any> {
    return this.http.get<any>(this.singleSeasonUrl + seriesId + '/' + seriesSeason);
  }

  getTrendingSeries(): Observable<Series[]> {
    return this.http.get<Series[]>(this.trendingSeriesUrl);
  }

  /*
   * days: 3, 7, 14, 21
   */
  getGuideSeries(days: number): Observable<Episode[]> {
    return this.http.get<Episode[]>(this.guideUrl + days);
  }

  getGuideSeriesDay(date: string): Observable<Episode[]> {
    return this.http.get<Episode[]>(this.guideUrlDay + date);
  }

  getSingleSeries(uniqueName): Observable<Series> {
    return this.http.get<Series>(this.singleSeriesUrl + uniqueName);
  }

  getUnseenAmountBySeries(seriesId, seasons): Observable<any> {
    return this.http.get<any>(this.unseenAmountBySeries + seriesId + '/' + seasons);
  }

  /* TODO: caching ? */
  getProfileStats(): Observable<any> {
    return this.getProfileStatsWithFilter(null, null);
  }

  //
  getProfileStatsWithFilter(from: Date, to: Date): Observable<any> {
    // dates are formatted as yyyy-MM-dd
    const completeUrl = this.statsUrl + (from ? '?from=' + from.toISOString().slice(0, 10) : '')
      + (to ? '&to=' + to.toISOString().slice(0, 10) : '');
    return this.http.get(completeUrl);
  }

  getProfileSeries(): Observable<Series[]> {
    return this.http.get<Series[]>(this.profileUrl);
  }

  /*
   * Following
   */

  followSeries(seriesId) {
    return this.http
      .get(this.followUrl + seriesId);
  }

  unfollowSeries(seriesId) {
    return this.http
      .get(this.unfollowUrl + seriesId);
  }


  /*
   *  Seen for single
   */

  seenEpisode(episodeId, mode) {
    return this.http.post(this.seenUrl + episodeId, {'mode' : mode});
  }

  unseeEpisode(episodeId, mode) {
    return this.http.post(this.unseenUrl + episodeId, {'mode' : mode});
  }

  /*
   *  update series profile order
  */

  updateSeriesProfileOrder(order) {
    return this.http.post( this.seriesProfileOrderURL,  order);
  }


  // /*
  //  * end seen
  //  */

  //
  // getSpotlightSeries(): Promise<Series []> {
  //   return this.http.get(this.spotlightSeriesUrl)
  //     .toPromise()
  //     .then(response => response.json())
  //     .catch(this.handleError);
  // }
  //
  // getSeriesGenres() {
  //   return [{'genre' : 'Action'}, {'genre' : 'Adventure'}, {'genre' : 'Animation'}, {'genre' : 'Comedy'}
  //     , {'genre' : 'Children'}, {'genre' : 'Crime'}, {'genre' : 'Drama'}, {'genre' : 'Documentary'}
  //     , {'genre' : 'Fantasy'}, {'genre' : 'Mystery'}, {'genre' : 'Game Show'}, {'genre' : 'Horror'}
  //     , {'genre' : 'News'}, {'genre' : 'Reality'}, {'genre' : 'Science-Fiction'}, {'genre' : 'Soap'}
  //     , {'genre' : 'Sport'}, {'genre' : 'Talk Show'}, {'genre' : 'Western'}, {'genre' : 'Travel'}, {'genre' : 'Romance'}];
  // }
  //
  // getTrendingSeries(): Promise<Series[]> {
  //   return this.http.get(this.trendingSeriesUrl)
  //     .toPromise()
  //     .then(response => response.json())
  //     .catch(this.handleError);
  // }
  //
  //
  // /* TODO: move to profile service */
  //
  // getProfileSeriesTest(): Observable <Series[]> {
  //   return this.http.get(this.profileUrl).map(res => res.json());
  // }
  //
  // getProfileSeries(): Promise<Series[]> {
  //   return this.http.get(this.profileUrl)
  //     .toPromise()
  //     .then(response => response.json())
  //     .catch(this.handleError);
  // }
  //


  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
