import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-ea-button-flat',
  templateUrl: 'ea-button-flat.html',
  styleUrls : ['ea-button-flat.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EaButtonFlatComponent {
  @Input() buttonLabel: string;
  @Input() buttonSize: string;

  constructor() {
  }

}
