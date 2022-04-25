import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';

import { Vector } from './interface/interfaces';
import { ErrorsService } from './services/errors.service';
import { NavBarService } from './services/nav-bar.service';
import { WindowService } from './services/window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  @ViewChild('matDrawer') private matDrawer!: MatDrawer;
  
  public isDesktop: boolean = true;
  public title: string = '';
  public errors: Error[] = [];
  public searchBarValue="";
  public appContentOverflowY:string = "auto";

  private windowSize: Vector = { x: 0, y: 0 };

  private titleEventSubscription: Subscription;
  private errorsEventSubscription: Subscription;
  private appContentOverflowYSubscription: Subscription;

  constructor(
    //Created Services
    private navBarService: NavBarService,
    private errorsService: ErrorsService,
    private windowService: WindowService
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
