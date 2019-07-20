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

  constructor ( private http: HttpClient ) {
    this.baseUrl = API_URL;
    this.profileUrl = this.baseUrl + '/profile';
    this.changeProfileUrl = `${this.profileUrl}/credentials`;
  }

  getUserProfile() : Observable<UserProfile> {
    return this.http.get<UserProfile> (this.profileUrl);
  }

  changeUserProfile(formData: User) {
    return this.http.post(this.changeProfileUrl, formData)
      .toPromise()
      .then(response => {
        console.log(response);
        return Promise.resolve(response);
      })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
