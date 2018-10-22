import { Component, OnInit } from '@angular/core';
import { Series } from '../model/series';
import { SearchService } from './search.service';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: 'search.html',
    styleUrls: [
        'search.scss'
    ],
    providers: [ SearchService ]
})

export class SearchComponent implements OnInit {
    searchField: FormControl;
    series: Series[];

    constructor(private searchService: SearchService) {
    }

  ngOnInit() {
    this.searchField = new FormControl();
    this.searchField.valueChanges
      .pipe(debounceTime(400))
      .subscribe(term => {
        this.search(term);
      });
  }

  search(term) {
    this.searchService.search(term).subscribe(response => {
      console.log(response);
      this.series = response;
    });
  }
}
