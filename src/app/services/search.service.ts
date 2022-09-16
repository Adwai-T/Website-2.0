import { Injectable, EventEmitter } from '@angular/core';
import { ErrorsService } from './errors.service';

export interface SearchResultObject {
  title: string;
  link: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService{

  private searchDialogBoxOpen:boolean;
  public search:EventEmitter<string> = new EventEmitter<string>();

  constructor(private errorsService: ErrorsService) {
    this.searchDialogBoxOpen = false;
  }

  public onSearch(searchString: string) :void{
    if(searchString.length < 5) {
      this.errorsService.addError(
        {
          code: 0, 
          message: 'Search string must atleast be 5 characters long.'
        }
      );
      return;
    }
    this.search.emit(searchString);
  }

  public isSearchDialogBoxOpen() :boolean {
    return this.searchDialogBoxOpen;
  }

  public setSearchDialogBoxOpen(toggle:boolean) :void{
    this.searchDialogBoxOpen = toggle;
  }
}
