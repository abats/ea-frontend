import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class SearchService {
  queryUrl = 'series/search/';
  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  search(terms: Observable<string>) {
    return terms.pipe(
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term)));
  }

  searchEntries(term) {
    return this.http
      .get(this.API_URL + '/' + this.queryUrl + term)
      .pipe(map(res => res));
  }
}
