import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserProfile } from '../model/userProfile';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user';

const API_URL = environment.apiUrl;

@Injectable()
export class UserService {
  private baseUrl: string;
  private profileUrl: string;
  private changeProfileUrl: string;
  private changeUserPreferencesUrl: string;

  constructor ( private http: HttpClient ) {
    this.baseUrl = API_URL;
    this.profileUrl = this.baseUrl + '/profile';
    this.changeProfileUrl = `${this.profileUrl}/credentials`;
    this.changeUserPreferencesUrl = `${this.profileUrl}/preferences`;
  }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile> (this.profileUrl);
  }

  changeUserPreferences(formData: any) {
    return this.http.post(this.changeUserPreferencesUrl, formData)
      .toPromise()
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(this.handleError);
  }

  changeUserProfile(formData: User) {
    return this.http.post(this.changeProfileUrl, formData)
      .toPromise()
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
