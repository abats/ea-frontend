import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-login-ea',
  templateUrl: 'google.login.ea.component.html',
  styleUrls: [
    'google.login.ea.component.scss'
  ]
})

export class GoogleLoginEaComponent implements OnInit {
  public state: string;
  public client_id: string;
  public googleRedirectURI: string;

  constructor() {
    // It would be better if the state came from a service on demand so it can't expire
    this.state = localStorage.getItem('eaState')
    this.client_id = '756279714032-9r0not6lpuhgcfd6p1e10b442gumo6qa.apps.googleusercontent.com';
    this.googleRedirectURI = 'http://www.episode-alert.com/login';
  }

  ngOnInit(): void {

  }


}
