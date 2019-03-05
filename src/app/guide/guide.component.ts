import { Component, OnInit } from '@angular/core';
import {SeriesService} from '../services/series.service';
import {AuthService} from '../services/auth.service';
import {Title} from '@angular/platform-browser';
import {Episode} from '../model/episode';
import {GuideCalendar} from '../model/calendar';
import * as moment from 'moment';
import {Observable, Observer, Subscribable, Subscription} from 'rxjs';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit {
  private series$;
  private episodesCalendar$;
  guideSeries: Episode[];
  guideEpisodesCalendar: GuideCalendar = new GuideCalendar();
  guideDays: number;
  yesterday;
  today;
  tomorrow;

  constructor( private seriesService: SeriesService,
               public authService: AuthService,
               private titleService: Title) {

    this.titleService.setTitle('Episode Alert - My Guide');
    this.guideDays = 3;
  }

  ngOnInit() {

    this.today = moment();
    this.yesterday = moment().add(-1, 'days');
    this.tomorrow = moment().add(1, 'days');

    this.getGuideSeries(this.guideDays);
    this.collectThreeDays();
  }

  getMiddleDay() {
    if (this.today.fromNow() === 'a few seconds ago') {
      return 'Today';
    } else {
      return this.today.fromNow();
    }
  }

  nextThreeDays() {
    this.yesterday.add(3, 'days');
    this.today.add(3, 'days');
    this.tomorrow.add(3, 'days');

    this.collectThreeDays();
  }

  collectThreeDays() {
    this.getGuideSeriesPerDay(this.yesterday.format('YYYY-MM-DD'), 'day1');
    this.getGuideSeriesPerDay(this.today.format('YYYY-MM-DD'), 'day2');
    this.getGuideSeriesPerDay(this.tomorrow.format('YYYY-MM-DD'), 'day3');
  }

  previousThreeDays() {
    this.yesterday.add(-3, 'days');
    this.today.add(-3, 'days');
    this.tomorrow.add(-3, 'days');

    this.collectThreeDays();
  }

  changeDays() {
    this.getGuideSeries(this.guideDays);
  }

  testItBaby() {
    this.episodesCalendar$.next();
  }

  getGuideSeriesPerDay(day: string, dayInObject) {
    this.episodesCalendar$ = this.seriesService.getGuideSeriesDay(day).subscribe(
      (episodes) => {
        this.guideEpisodesCalendar[dayInObject] = episodes;
        console.log(this.guideEpisodesCalendar);
      }
    );

    this.episodesCalendar$.next();
  }

  getGuideSeries(numberOfDays: number) {
    this.series$ = this.seriesService.getGuideSeries(this.guideDays).subscribe(
      (episodes) => {
        this.guideSeries = episodes;
        console.log(this.guideSeries);
      }
    );
  }
}
