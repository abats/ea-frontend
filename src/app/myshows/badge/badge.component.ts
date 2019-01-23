import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-badge',
    templateUrl: 'badge.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: [
        'badge.scss'
    ]
})

export class BadgeComponent implements OnInit {
    @Input() content: String;
    @Input() color: String;
    showCheckBox = false;

    ngOnInit() {
        if (this.content === '0') {
            this.showCheckBox = true;
        }
    }


}
