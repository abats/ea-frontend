import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ISearchInterface } from './search-interface';

@Injectable({
  providedIn: 'root',
})

export class WorstService {
  queryUrl = 'series/search/';
  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  search(terms: Observable<ISearchInterface>) {
    console.log('inside search');
    console.log(terms);
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
