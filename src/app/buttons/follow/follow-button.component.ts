import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Series } from '../../model/series';
import { SeriesService } from '../../services/series.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-follow',
    templateUrl: 'follow-button.html',
    styleUrls : ['follow-button.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class FollowbuttonComponent {
    @Input() series: Series;
    @Input() buttonLabel: string;

    constructor( private seriesService: SeriesService,
                 private toasterService: ToastrService ) {
    }

    toggle() {
      if (this.series.following) {
        this.seriesService.unfollowSeries(this.series.id).toPromise().then(
          (response) => {
            this.toasterService.success('', `Unfollowed ${this.series.name}`);
            this.series.following = !this.series.following;
          }
        );
      } else {
        this.seriesService.followSeries(this.series.id).toPromise().then(
          (response) => {
            this.toasterService.success('', `Followed ${this.series.name}`);
            this.series.following = !this.series.following;
          }
        );
      }

    }
}
