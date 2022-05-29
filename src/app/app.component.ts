import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
export class AppComponent implements OnInit{
  @ViewChild('matDrawer') private matDrawer!: MatDrawer;
  @ViewChild('container') private container!: MatDrawerContainer;
  @ViewChild('sideNav', {static:true}) private sideNav!: ElementRef;

  public isDesktop: boolean = true;
  public title: string = '';
  public errors: Error[] = [];
  public searchBarValue = '';
  public appContentOverflowY: string = 'auto';
  public userLoggedIn:boolean = false;

  private windowSize: Vector = { x: 0, y: 0 };

  private titleEventSubscription: Subscription;
  private errorsEventSubscription: Subscription;
  private appContentOverflowYSubscription: Subscription;

  constructor(
    //Created Services
    private navBarService: NavBarService,
    private errorsService: ErrorsService,
    private windowService: WindowService,
    private theme: ThemeService
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

    this.appContentOverflowYSubscription =
      windowService.appContentOverflowYEvent.subscribe(
        (overflowType: string) => (this.appContentOverflowY = overflowType)
      );
  }
  ngOnInit(): void {
    this.theme.setSideNavEl(this.sideNav);
  }

  @HostListener('window:resize')
  private onWindowResize(): void {
    this.windowSize.x = window.innerWidth;
    this.windowSize.y = window.innerHeight;
    this.windowService.setWindowSize(this.windowSize);
    this.checkAndSetIfIsDesktop();
  }

  private checkAndSetIfIsDesktop(): void {
    if (this.windowSize.x < 768) this.isDesktop = false;
    else this.isDesktop = true;
  }

  public logoutUser() :void {
    console.log("User logged Out");
  }

  @HostListener('window:message', ["$event"])
  onThemeChange(e:any): void {
    if(e.origin === origin) {
      if(typeof(e.data) !== "string") return;
      
      if(e.data === 'iframe-dark-theme') {
        this.theme.setTheme(this.sideNav.nativeElement, this.theme.themes.dark);
      }else if(e.data === 'iframe-light-theme') {
        this.theme.setTheme(this.sideNav.nativeElement, this.theme.themes.light);
      }
    }
  }
}
