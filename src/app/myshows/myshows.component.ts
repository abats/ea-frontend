import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Series } from '../model/series';
import { SeriesService } from '../services/series.service';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import {CanActivate} from '@angular/router';

@Component({
  selector: 'app-myshows',
  templateUrl: './myshows.component.html',
  styleUrls: ['./myshows.component.scss']
})

export class MyshowsComponent implements OnInit, OnDestroy {
  private series$;
  pristineSeries: Series [];
  profileSeries: Series [];
  search: String;
  order: String = '';
  orderReverse: boolean;
  public profileSeriesView: string;
  public showUnseen: boolean;
  public showArchive: boolean;
  public showEnded: boolean;
  public options: { onUpdate: (event: any) => void, handle: '.handle' };
  private SERIES_VIEW_LOCAL_STORAGE_KEY = 'seriesView';
  private USER_FILTER_SETTINGS_KEY = 'userFilterSettings';
  public userFilterSettings;

  constructor(  private seriesService: SeriesService,
                public authService: AuthService,
                private titleService: Title,
                private toastr: ToastrService) {

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

    if (JSON.parse(this.getLocalStorage(this.USER_FILTER_SETTINGS_KEY))) {
      this.userFilterSettings = JSON.parse(this.getLocalStorage(this.USER_FILTER_SETTINGS_KEY));
    } else {
      this.userFilterSettings = <IUserFilterSettings> {
        showUnseen: false,
        showArchive: false,
        showEnded: false
      };

      this.setLocalStorage(this.USER_FILTER_SETTINGS_KEY, JSON.stringify( this.userFilterSettings));
    }

    this.profileSeriesView =  this.getLocalStorage(this.SERIES_VIEW_LOCAL_STORAGE_KEY) || 'poster';
  }

  setLocalStorage(item: string, value: any): void {
    localStorage.setItem(item, value);
  }

  getLocalStorage(item: string): string {
    return localStorage.getItem(item);
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

    this.setLocalStorage(this.SERIES_VIEW_LOCAL_STORAGE_KEY, newValue);
    this.profileSeriesView = newValue;

  }

  clickToggleUnseen() {
    this.userFilterSettings.showUnseen = !this.userFilterSettings.showUnseen;
    this.setLocalStorage(this.USER_FILTER_SETTINGS_KEY, JSON.stringify(this.userFilterSettings));
    this.filterSeries();
  }

  clickToggleArchive() {
    this.userFilterSettings.showArchive = !this.userFilterSettings.showArchive
    this.setLocalStorage(this.USER_FILTER_SETTINGS_KEY, JSON.stringify(this.userFilterSettings));
    this.filterSeries();
  }

  clickToggleEnded() {
    this.userFilterSettings.showEnded = !this.userFilterSettings.showEnded
    this.setLocalStorage(this.USER_FILTER_SETTINGS_KEY, JSON.stringify(this.userFilterSettings));
    this.filterSeries();
  }

  setOrder(order) {
    this.orderReverse = !this.orderReverse;
    this.order = order;
  }

  /*
   * filter out the series
   *  todo: rewrite
   */

  filterSeries() {

    if (this.pristineSeries.length > 0) {
      this.profileSeries = this.pristineSeries.slice();


      for (let i = this.profileSeries.length - 1; i >= 0; i--) {
        if (this.userFilterSettings.showUnseen) {
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
        if (!this.userFilterSettings.showArchive) {
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
        if (this.userFilterSettings.showEnded) {
          if (this.profileSeries[i].status === 'Ended') {
            this.profileSeries.splice(i, 1);
            continue;
          }
        }
      }


    }
  }

  public showToaster() {
    this.toastr.success('Success', 'Toastr fun!');
    this.toastr.warning('Warning', 'Toastr fun!');
    this.toastr.info('Info', 'Toastr fun!');
    this.toastr.error('Error', 'Toastr fun!');
  }

  ngOnInit() {
    this.order = '';
    this.orderReverse = true;
    this.getProfileSeries();

    if (!this.authService.isLoggedIn()) {
      this.authService.getAuth()
        .then((authInfo) => {
          console.log('logged in');
          console.log(authInfo);
        })
        .catch((error) => {
          console.log('not logged in');
          console.log(error);
        })
    }
  }

  ngOnDestroy() {
    this.series$.unsubscribe();
  }
}

