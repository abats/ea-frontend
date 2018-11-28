import { Component, OnInit, Input } from '@angular/core';
import { SeriesService } from '../services/series.service';

@Component({
  selector: 'app-userstats',
  templateUrl: 'user-stats.html',
  styleUrls: [
    'user-stats.scss'
  ]
})

export class UserStatsComponent implements OnInit {
  @Input() state: string;
  profileStats: any;
  private profileStats$;

  constructor(
    private seriesService: SeriesService
  ) {

    this.profileStats$ = this.seriesService.getProfileStats().subscribe(profileStatResponse => {
      this.profileStats = profileStatResponse;
    });
  }

  // getStats() {
  //   switch (this.state) {
  //     case 'all':
  //       this.seriesService.getProfileStats().then(
  //         (stats) => {
  //           this.profileStats = stats;
  //         }
  //       );
  //       break;
  //     case 'withFilter':
  //       const today = new Date();
  //       const dateInLastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  //       this.seriesService.getProfileStatsWithFilter(dateInLastWeek, today).then(
  //         (stats) => {
  //           this.profileStats = stats;
  //         }
  //       );
  //       break;
  //   }
  // }

  ngOnInit() {
  }

}
