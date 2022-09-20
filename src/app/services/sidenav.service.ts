import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  public sideNavToggle :EventEmitter<string> = new EventEmitter<string>();
  private isDesktopMode:boolean = true;

  constructor() { }

  public sideNavOpen() :void {
    this.sideNavToggle.emit('open');
  }

  public sideNavClose() :void {
    this.sideNavToggle.emit('close');
  }

  public setIsDesktopMode(val:boolean) :void {
    this.isDesktopMode = val;
  }

  public isDesktop() :boolean {
    return this.isDesktopMode;
  }
}
