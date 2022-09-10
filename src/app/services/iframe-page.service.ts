import { EventEmitter, Injectable } from '@angular/core';

import { Page, Pages, PagesI } from '../objects/pages';

@Injectable({
  providedIn: 'root'
})
export class IframePageService {

  private currentPage:Page;
  private navFragment:string;
  private pages:PagesI = Pages; 

  public getPageUrlEvent:EventEmitter<Page> = new EventEmitter();
  
  constructor() {
    this.currentPage = this.pages.angular; //temp set currentPage to something
    this.navFragment = '';
    // this.setCurrentPage(this.pages.Cpp);
  }

  public setCurrentPage (page:Page):void {
    this.currentPage = page;
    this.getPageUrlEvent.emit(page);
  }

  public getCurrentPage ():Page {
    return this.currentPage;
  }

  public setNavFragment (fragment:string) :void{
    this.navFragment = fragment;
  }

  public getNavFragment ():string {
    return this.navFragment;
  }
}
