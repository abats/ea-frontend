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
    @Output() seenUpdatedEmitter = new EventEmitter<boolean>();

    private episodeSeen$ = new Subscription();

    constructor( private seriesService: SeriesService ) {
    }

    seenUpdated() {
      this.seenUpdatedEmitter.emit(true);
    }

    toggleSeen(mode) {
      this.episodeSeen$ = this.seriesService.seenEpisode(this.episode.id, mode).subscribe( response => {
        this.episode.seen = !this.episode.seen;
        this.seenUpdated();
      });
    }

    toggleUnseen(mode) {
      this.episodeSeen$ = this.seriesService.unseeEpisode(this.episode.id, mode).subscribe( response => {
        this.episode.seen = !this.episode.seen;
        this.seenUpdated();
      });
    }

  ngOnDestroy() {
      this.episodeSeen$.unsubscribe();
  }

}
