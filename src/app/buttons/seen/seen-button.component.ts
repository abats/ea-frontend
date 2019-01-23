import {Component, Input, ChangeDetectionStrategy, OnInit, OnDestroy} from '@angular/core';
import { SeriesService } from '../../services/series.service';

@Component({
    selector: 'app-seen',
    templateUrl: 'seen-button.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: [
        'seen-button.scss'
    ]
})

export class SeenbuttonComponent implements OnDestroy  {
    @Input() episode: any;
    @Input() buttonLabel: string;
    @Input() seen: boolean;

    private episodeSeen$;

    constructor( private seriesService: SeriesService ) {
    }

    toggleSeen(mode) {
      this.episodeSeen$ = this.seriesService.seenEpisode(this.episode.id, mode).subscribe( response => {
        this.episode.seen = !this.episode.seen;
      });
    }

    toggleUnseen(mode) {
      this.episodeSeen$ = this.seriesService.unseeEpisode(this.episode.id, mode).subscribe( response => {
        this.episode.seen = !this.episode.seen;
      });
    }

  ngOnDestroy() {
    this.episodeSeen$.unsubscribe();
  }

}
