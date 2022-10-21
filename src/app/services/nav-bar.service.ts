import { Location } from '@angular/common';
import { EventEmitter, HostListener, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  private title: string = '';
  private currentParentUrl: string = '';
  public titleEvent: EventEmitter<string> = new EventEmitter();

  constructor(
    //Angular Services
    private titleService: Title,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) {}

  public changeTitle(title: string): boolean {
    if (title) {
      this.title = title;
      this.titleService.setTitle(title);
      this.titleEvent.emit(this.title);
      return true;
    }
    return false;
  }
  
  public locationService(): Location {
    return this.location;
  }
  public routerService(): Router {
    return this.router;
  }
  public getCurrentRoute(): ActivatedRoute {
    return this.activatedRoute;
  }

 
  public getTitle(): string {
    return this.title;
  }
  
  /**
   * @returns Returns the current parent url in the angular router.
   */
  public getCurrentParentUrl() :string {
    return this.currentParentUrl;
  }

  /**
   * @returns Returns current Url according to angular router 
   */
  public getCurrentUrl():string {
    return this.router.url;
  }

  public setCurrentParentUrl(parent: string) {
    this.currentParentUrl = parent;
  }

  public setUrl(url:string):void{
    this.location.go(url);
  }
}
