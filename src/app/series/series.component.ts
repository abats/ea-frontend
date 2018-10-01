import {Component, Input, OnInit} from '@angular/core';
import {Series} from '../model/series';
import {ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  @Input() series: Series;
  subscription: Subscription;
  uniqueName: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        this.uniqueName = param.uniqueName;
      });
  }

  ngOnInit() {
  }

}
