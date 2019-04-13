import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserProfile } from '../model/userProfile';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable()
export class UserService {
  private baseUrl: string;
  private profileUrl: string;

  constructor ( private http: HttpClient ) {
    this.baseUrl = API_URL;
    this.profileUrl = this.baseUrl + '/profile';
  }

  getUserProfile() : Observable<UserProfile> {
    return this.http.get<UserProfile> (this.profileUrl);
  }
}
