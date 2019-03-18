import { Component, OnInit } from '@angular/core';
import { Series } from '../model/series';
import { SearchService } from './search.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: 'search.html',
    styleUrls: [
        'search.scss'
    ],
    providers: [ SearchService ]
})

export class SearchComponent implements OnInit {
    searchField: string;
    series: Series[];
    searchTerm$ = new Subject<string>();

    constructor(private searchService: SearchService) {
      this.searchService.search(this.searchTerm$)
        .subscribe(results => {
          this.series = <Series[]>results;
        });
    }

  ngOnInit() {
  }

}
