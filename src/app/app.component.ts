import {Component, OnDestroy, OnInit} from '@angular/core';
import { SeriesService } from './services/series.service';
import { Series } from './model/series';
import {AuthService} from './services/auth.service';
import {RouterOutlet} from '@angular/router';
import {fadeAnimation} from './annimations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeAnimation
    // animation triggers go here
  ]
})

export class AppComponent implements OnDestroy, OnInit {
  constructor(
    public authService: AuthService) {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnDestroy() {
  }

  ngOnInit(): void {
    const user = this.authService.getAuth();
  }

}
