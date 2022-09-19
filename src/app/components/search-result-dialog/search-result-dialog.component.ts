import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  SearchResult,
  searchResultObject,
  SearchService,
} from 'src/app/services/search.service';

@Component({
  selector: 'app-search-result-dialog',
  templateUrl: './search-result-dialog.component.html',
  styleUrls: ['./search-result-dialog.component.css'],
})
export class SearchResultDialogComponent implements OnInit, OnDestroy {
  private searchResultSubscription: Subscription;

  public searchResultMain: SearchResult[] = [];
  public searchResultOther: SearchResult[] = [];

  constructor(
    public searchDialogRef: MatDialogRef<SearchResultDialogComponent>,
    public router: Router,
    public searchService: SearchService
  ) {
    this.searchResultSubscription = this.searchService.searchEvent.subscribe(
      (searchChange:boolean) => {
        if(searchChange) {
          this.searchResultMain = searchService.getCurrentSearchResult().main;
          this.searchResultOther = searchService.getCurrentSearchResult().other;
        }
      }
    )
  }

  ngOnInit(): void {
    this.searchResultMain = this.searchService.getCurrentSearchResult().main;
    this.searchResultOther = this.searchService.getCurrentSearchResult().other;
  }

  public goTo(link:string) {
    this.router.navigateByUrl('/notes/' + link);
  }

  ngOnDestroy(): void {
    this.searchResultSubscription.unsubscribe();
  }

}
