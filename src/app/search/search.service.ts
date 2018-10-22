import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../constants/main';
import {Series} from '../model/series';

@Injectable()
export class SearchService {
  queryUrl = 'series/search?query=';
  baseUrl: string = CONSTANTS.APP.API_BASE_URL;

  constructor(private http: HttpClient) { }

  search(term): Observable<Series[]>  {
    return this.http.get<Series[]>(this.baseUrl + this.queryUrl + term);
  }
}
