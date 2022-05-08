import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

import { Vector } from './interface/interfaces';
import { ErrorsService } from './services/errors.service';
import { NavBarService } from './services/nav-bar.service';
import { ThemeService } from './services/theme.service';
import { WindowService } from './services/window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  @ViewChild('matDrawer') private matDrawer!: MatDrawer;
  @ViewChild('container') private container!: MatDrawerContainer;
  
  public isDesktop: boolean = true;
  public title: string = '';
  public errors: Error[] = [];
  public searchBarValue="";
  public appContentOverflowY:string = "auto";

  private windowSize: Vector = { x: 0, y: 0 };

  private titleEventSubscription: Subscription;
  private errorsEventSubscription: Subscription;
  private appContentOverflowYSubscription: Subscription;
  private themeSubscription:Subscription;

  constructor(
    //Created Services
    private navBarService: NavBarService,
    private errorsService: ErrorsService,
    private windowService: WindowService,
    private theme:ThemeService,
  ) {
    this.windowSize.x = window.innerWidth;
    this.windowSize.y = window.innerHeight;
    this.checkAndSetIfIsDesktop();
  

    this.title = 'Home';

    this.titleEventSubscription = navBarService.titleEvent.subscribe(
      (title: string) => (this.title = title)
    );

    this.errorsEventSubscription = errorsService.errorsEvent.subscribe(
      (errors: Error[]) => (this.errors = errors)
    );

    this.appContentOverflowYSubscription = windowService.appContentOverflowYEvent
    .subscribe(
      (overflowType:string) => (this.appContentOverflowY=overflowType)
    );

    this.themeSubscription = theme.themeEvent.subscribe(
      (themeName:string) => (console.log(themeName))
    );
  }

  @HostListener('window:resize')
  private onWindowResize() {
    this.windowSize.x = window.innerWidth;
    this.windowSize.y = window.innerHeight;
    this.windowService.setWindowSize(this.windowSize);
    this.checkAndSetIfIsDesktop();
  }

  private checkAndSetIfIsDesktop(): void {
    if (this.windowSize.x < 768) this.isDesktop = false;
    else this.isDesktop = true;
  }
}
