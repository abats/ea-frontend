import {Component, Input, ChangeDetectionStrategy, OnDestroy, Output, EventEmitter} from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { Subscription } from 'rxjs';

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
    @Output() seenUpdatedEmitter = new EventEmitter<any>();

    private episodeSeen$ = new Subscription();

    constructor( private seriesService: SeriesService ) {
    }

    seenUpdated(seenShows: any) {
      this.seenUpdatedEmitter.emit({ episodes: seenShows, seen: 'seen'});
    }

    unseenUpdated(unseenShows: any) {
      this.seenUpdatedEmitter.emit({ episodes: unseenShows, seen: 'unseen'});
    }

    toggleSeen(mode) {
      this.episodeSeen$ = this.seriesService.seenEpisode(this.episode.id, mode).subscribe( seenShows => {
        this.episode.seen = !this.episode.seen;
        this.seenUpdated(seenShows);
      });
    }

    toggleUnseen(mode) {
      this.episodeSeen$ = this.seriesService.unseeEpisode(this.episode.id, mode).subscribe( unseenShows => {
        this.episode.seen = !this.episode.seen;
        this.unseenUpdated(unseenShows);
      });
    }

  ngOnDestroy() {
      this.episodeSeen$.unsubscribe();
  }

}
