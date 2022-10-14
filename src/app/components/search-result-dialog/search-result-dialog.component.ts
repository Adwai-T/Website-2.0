import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  searchResult,
  searchResultObject,
  SearchService,
} from 'src/app/services/search.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-search-result-dialog',
  templateUrl: './search-result-dialog.component.html',
  styleUrls: ['./search-result-dialog.component.css'],
})
export class SearchResultDialogComponent implements OnInit, OnDestroy {
  private searchResultSubscription: Subscription;

  public searchResultMain: searchResult = {};
  public searchResultOther: searchResult = {};

  constructor(
    public searchDialogRef: MatDialogRef<SearchResultDialogComponent>,
    public router: Router,
    public searchService: SearchService,
    public sidenavService: SidenavService,
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
    if(!this.sidenavService.isDesktop()) {
      this.sidenavService.sideNavClose();
    }
    this.router.navigateByUrl('/notes/' + link);
  }

  get searchResultMainKeys() :string[]  {
    return Object.keys(this.searchResultMain)
  }

  get searchResultOtherKeys() :string[]  {
    return Object.keys(this.searchResultOther)
  }

  ngOnDestroy(): void {
    this.searchResultSubscription.unsubscribe();
  }

}
