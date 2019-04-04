import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {Series} from '../model/series';
import {BrowseInterface} from '../browse/browse.interface';

@Injectable()
export class SeriesBrowseService {
  queryUrl = 'series/genre/';
  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  search(terms: Observable<any>) {
    return terms.pipe(
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term)));
  }

  searchEntries(term) {
    return this.http
      .get(this.API_URL + '/' + this.queryUrl + term.genre + '/' + term.page)
      .pipe(map(res => res));
  }

}
