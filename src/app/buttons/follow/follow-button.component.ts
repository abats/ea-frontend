import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Series } from '../../model/series';
import { SeriesService } from '../../services/series.service';

@Component({
    selector: 'app-follow',
    templateUrl: 'follow-button.html',
    styleUrls : ['follow-button.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class FollowbuttonComponent {
    @Input() series: Series;
    @Input() buttonLabel: string;

    constructor( private seriesService: SeriesService ) {
    }

    toggle() {
      if (this.series.following) {
        this.seriesService.unfollowSeries(this.series.id).toPromise().then(
          (response) => {
            this.series.following = !this.series.following;
          }
        );
      } else {
        this.seriesService.followSeries(this.series.id).toPromise().then(
          (response) => {
            this.series.following = !this.series.following;
          }
        );
      }

    }
}
