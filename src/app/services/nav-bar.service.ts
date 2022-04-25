import { Location } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  private title: string = '';
  public titleEvent: EventEmitter<string> = new EventEmitter();

  constructor(
    //Angular Services
    private titleService: Title,
    private router: Router,
    private location: Location,
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

  public getTitle(): string {
    return this.title;
  }

  public getCurrentUrl():string{
    return this.router.url;
  }

  public setUrl(url:string):void{
    this.location.go(url);
  }
}
