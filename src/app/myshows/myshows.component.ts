import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LocalStorage, StorageProperty } from 'h5webstorage';
import { Series } from '../model/series';
import { SeriesService } from '../services/series.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-myshows',
  templateUrl: './myshows.component.html',
  styleUrls: ['./myshows.component.scss']
})

export class MyshowsComponent implements OnInit, OnDestroy {
  private series$;
  private seriesOrder$;
  pristineSeries: Series [];
  seriesTest: Series [];
  profileSeries: Series [];
  search: String;
  order: String = '';
  orderReverse: boolean;
  @StorageProperty() public profileSeriesView: string;
  @StorageProperty() public showUnseen: boolean;
  @StorageProperty() public showArchive: boolean;
  @StorageProperty() public showEnded: boolean;
  public options: { onUpdate: (event: any) => void, handle: '.handle' };


  constructor( private seriesService: SeriesService,
               public authService: AuthService,
               private titleService: Title,
               private localStorage: LocalStorage) {

    titleService.setTitle('Episode Alert - My Shows');

    this.options = {
      handle: '.handle',
      onUpdate: (event: any) => {
        // switch items
       const newOrderArray =  {'order' : this.switchArrayItemsSeries(event.newIndex, event.oldIndex) };
       const newOrderJsonString = JSON.stringify(newOrderArray);
       seriesService.updateSeriesProfileOrder(newOrderJsonString).subscribe();
      }
    };

    /*
     * TODO: Implement services as observables one day
     */
    // let series$ = seriesService.getProfileSeriesTest();
    //
    // series$.subscribe(
    //     series => this.seriesTest = series
    // );

  }

  updateProfileSeriesOrder() {

  }

  switchArrayItemsSeries(newIndex, oldIndex) {
    const temp = this.profileSeries[oldIndex];
    this.profileSeries[oldIndex] = this.profileSeries[newIndex];
    this.profileSeries[newIndex] = temp;

    const newArray = [];
    for (let i = 0;  i < this.profileSeries.length; i++) {
      newArray.push(this.profileSeries[i].id);
    }

    return newArray;
  }


  getProfileSeries() {
    this.series$ = this.seriesService.getProfileSeries().subscribe(
      (series) => {
        this.profileSeries = series;
        this.pristineSeries = series;

        /*
         * Initial sorting
         */
        this.filterSeries();
      }
    );
  }

  /*
   * UI toggles
   */

  toggleSeriesView() {
    let newValue: string;

    if (this.profileSeriesView === 'poster') {
      newValue = 'poster_big';

    } else if (this.profileSeriesView === 'poster_big') {
      newValue = 'list';
    } else if (this.profileSeriesView === 'list') {
      newValue = 'poster';
    }

    this.profileSeriesView = newValue;

  }

  clickToggleUnseen() {
    this.showUnseen = !this.showUnseen;
    this.filterSeries();
  }

  clickToggleArchive() {
    this.showArchive = !this.showArchive;
    this.filterSeries();
  }

  clickToggleEnded() {
    this.showEnded = !this.showEnded;
    this.filterSeries();
  }

  setOrder(order) {
    this.orderReverse = !this.orderReverse;
    this.order = order;
  }

  /*
   * filter out the series
   */

  filterSeries() {

    if (this.pristineSeries.length > 0) {
      this.profileSeries = this.pristineSeries.slice();


      for (let i = this.profileSeries.length - 1; i >= 0; i--) {
        if (this.showUnseen) {
          if (this.profileSeries[i].unseen_episodes === 0) {
            this.profileSeries.splice(i, 1);
            continue;
          }
        }
      }

      /*
       * If Archive is false they should be filtered out
       */
      for (let i = this.profileSeries.length - 1; i >= 0; i--) {
        if (!this.showArchive) {
          if (this.profileSeries[i].archive) {
            this.profileSeries.splice(i, 1);
            continue;
          }
        }
      }

      /*
       * If Ended is true they should be filtered out
       */
      for (let i = this.profileSeries.length - 1; i >= 0; i--) {
        if (this.showEnded) {
          if (this.profileSeries[i].status === 'Ended') {
            this.profileSeries.splice(i, 1);
            continue;
          }
        }
      }


    }
  }

  ngOnInit() {
    this.order = '';
    this.orderReverse = true;
    this.getProfileSeries();

    // TODO: get the profileSeriesView on init, otherwise set it to a default
    if (!this.profileSeriesView) {
      this.profileSeriesView = 'poster';
    }

    if (!this.authService.isLoggedIn()) {
      this.authService.getAuth()
        .then((authInfo) => {
          // console.log(authInfo);
        });
    }

  }

  ngOnDestroy() {
    this.series$.unsubscribe();
  }
}
