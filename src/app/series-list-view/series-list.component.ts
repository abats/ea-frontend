import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Series } from '../model/series';

@Component({
  selector: 'app-series-list',
  templateUrl: 'series-list.component.html',
  styleUrls : ['series-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SeriesListComponent {
  @Input() series: Series;

  constructor( ) {
  }

}
