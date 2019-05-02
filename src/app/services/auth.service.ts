import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  private user: User;
  private testValue: string;
  private baseUrl: string;
  private authCheckUrl: string;
  private loginUrl: string;
  private logoutUrl: string;

  constructor(
    private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
    this.authCheckUrl = this.baseUrl + '/auth/check';
    this.loginUrl = this.baseUrl + '/auth/login';
    this.logoutUrl = this.baseUrl + '/auth/logout';
    this.user = new User;
  }

  public getTestValue() {
    return this.testValue;
  }

  public setTestValue(newValue) {
    this.testValue = newValue;
  }

  public getUserName() {
    return this.user.name;
  }

  public isLoggedIn() {
    return localStorage.getItem('authenticated');
  }

  logout() {
    return this.http.get(this.logoutUrl)
      .toPromise()
      .then(response => {
        this.user = null;
        localStorage.removeItem('authenticated');
      });
  }

  login(response) {
    this.user.name = response.accountname;
    localStorage.setItem('authenticated', 'true');
  }

  loginUser(userCredentials): Promise <any> {
    console.log('login');
    console.log(userCredentials);
    return this.http.post(this.loginUrl, userCredentials)
      .toPromise()
      .then(response => {
        this.login (response);
      })
      .catch(this.handleError);
  }

  getAuth(): Promise<void> {
    return this.http.get(this.authCheckUrl,  { withCredentials: true })
      .toPromise()
      .then(response => {
        this.login (response);
      })
      .catch(this.handleError);
}

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
