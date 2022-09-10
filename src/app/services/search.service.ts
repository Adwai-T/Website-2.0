import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService{

  private searchDialogBoxOpen:boolean;
  public search:EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.searchDialogBoxOpen = false;
  }

  public onSearch(searchString: string) {
    if(searchString == '') return;
    this.search.emit(searchString);
  }

  public isSearchDialogBoxOpen() {
    return this.searchDialogBoxOpen;
  }

  public setSearchDialogBoxOpen(toggle:boolean) {
    this.searchDialogBoxOpen = toggle;
  }
}
