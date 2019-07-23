import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Series } from '../../model/series';

@Component({
  selector: 'app-archive',
  templateUrl: 'archive-button.html',
  styleUrls : ['archive-button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ArchiveButtonComponent {
  @Input() series: Series;
  @Input() buttonLabel: string;

  constructor( ) {
  }

  toggle() {

  }

}
