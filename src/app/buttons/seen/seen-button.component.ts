import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { SeriesService } from '../../services/series.service';

@Component({
    selector: 'app-seen',
    templateUrl: 'seen-button.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: [
        'seen-button.scss'
    ]
})

export class SeenbuttonComponent {
    @Input() episode: any;
    @Input() buttonLabel: string;
    @Input() seen: boolean;

    constructor( private seriesService: SeriesService ) {
    }

    // toggleSeen(mode) {
    //     this.seriesService.seenEpisode(this.episode.id, mode).then(
    //         (response) => {
    //             this.episode.seen = !this.episode.seen;
    //         }
    //     );
    // }
    //
    // toggleUnseen(mode) {
    //     this.seriesService.unseeEpisode(this.episode.id, mode).then(
    //         (response) => {
    //             this.episode.seen = !this.episode.seen;
    //         }
    //     );
    // }

}
