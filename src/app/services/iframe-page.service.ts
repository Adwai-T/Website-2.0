import { EventEmitter, Injectable } from '@angular/core';

import { Page, Pages, PagesI } from '../objects/pages';

@Injectable({
  providedIn: 'root'
})
export class IframePageService {

  private currentPage:Page;
  private pages:PagesI = Pages; 

  public getPageUrlEvent:EventEmitter<Page> = new EventEmitter();
  
  constructor() {
    this.currentPage = this.pages.angular;
    this.setCurrentPage(this.pages.Cpp);
  }

  public setCurrentPage (page:Page):void {
    this.currentPage = page;
    this.getPageUrlEvent.emit(page);
  }

  public getCurrentPage ():Page {
    return this.currentPage;
  }
}
