import { Component, OnInit } from '@angular/core';
import { WorstService } from './worst.service';
import {Series} from '../model/series';
import {Observable, Subject, Subscription} from 'rxjs';
import {SeriesService} from '../services/series.service';
import {ISearchInterface} from './search-interface';
import {SearchService} from '../search/search.service';

@Component({
  selector: 'app-contact-component',
  templateUrl: './contact-component.component.html',
  styleUrls: ['./contact-component.component.scss']
})

export class ContactComponentComponent implements OnInit {
  searchField1: string;
  searchField2: string;
  searchContent: ISearchInterface = { searchValue1: null, searchValue2: null};
  searchSubject$ = new Subject<ISearchInterface>();
  searchTerm$ = new Subject<string>();

  constructor( private searchService: SearchService,
               private worstService: WorstService) {

    this.searchService.search(this.searchTerm$)
      .subscribe(results => {
       console.log(results);
    });

    this.worstService.search(this.searchSubject$)
      .subscribe( response => {
      console.log(response);
    });
  }

  ngOnInit() {

  }

  getValues() {
    return this.searchContent;
  }

  onChange(e: Event) {
    console.log('change');
    this.searchContent.searchValue1 = this.searchField1;
    this.searchContent.searchValue2 = this.searchField2;
    console.log(this.searchContent.searchValue1);
    console.log('lets call next');
    this.searchSubject$.next(this.searchContent);

    this.searchTerm$.next(this.searchField1);
  }
}
