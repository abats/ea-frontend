import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-orderdisplay',
    templateUrl: 'orderdisplay.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class OrderDisplayComponent {
    @Input() order: String;
    @Input() activeOrder: String;
    @Input() orderReverse: boolean;

}
