import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { Vector } from './interface/interfaces';
import { AccountService, AuthConfirmation } from './services/account.service';
import { CookiesService } from './services/cookies.service';
import { ErrorsService, Error } from './services/errors.service';
import { NavBarService } from './services/nav-bar.service';
import { ThemeService } from './services/theme.service';
import { WindowService } from './services/window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('matDrawer') private matDrawer!: MatDrawer;
  @ViewChild('sideNav') private sideNavElement!: ElementRef;
  @ViewChild('container') private container!: MatDrawerContainer;
  @ViewChild('sideNav', { static: true }) private sideNav!: ElementRef;

  public isDesktop: boolean = true;
  public title: string = '';
  public searchBarValue = '';
  public appContentOverflowY: string = 'auto';
  public userLoggedIn: boolean = false;

  private mobileScreenSize: number = 1000;
  private windowSize: Vector = { x: 0, y: 0 };
  //Error SnackBar Config
  private errorActiveTime: number = 5000; //5 secs
  private errorHorizontalPostion: MatSnackBarHorizontalPosition = 'right';
  private errorVerticalPostion: MatSnackBarVerticalPosition = 'bottom';

  private titleEventSubscription: Subscription;
  private errorsEventSubscription: Subscription;
  private appContentOverflowYSubscription: Subscription;
  private accountLoginEventSubscription: Subscription;

  constructor(
    //Created Services
    private navBarService: NavBarService,
    private errorsService: ErrorsService,
    private windowService: WindowService,
    private theme: ThemeService,
    private matSnackBarError: MatSnackBar,
    private cookiesService: CookiesService,
    private accountService: AccountService,
  ) {
    this.windowSize.x = window.innerWidth;
    this.windowSize.y = window.innerHeight;
    this.checkAndSetNavBarSize();

    this.title = 'Home';

    this.titleEventSubscription = navBarService.titleEvent.subscribe(
      (title: string) => (this.title = title)
    );

    this.errorsEventSubscription = errorsService.errorsEvent.subscribe(
      (errors: Error[]) => {
        for (let i = 0; i < errors.length; i++) {
          let activeTime: number | undefined = this.errorActiveTime;
          if (errors[i].timeActive) {
            activeTime = errors[i].timeActive;
          }
          this.matSnackBarError.open(errors[i].message, '❌', {
            horizontalPosition: this.errorHorizontalPostion,
            verticalPosition: this.errorVerticalPostion,
            duration: activeTime,
          });
          this.errorsService.removeErrorAtIndex(i);
        }
      }
    );

    this.appContentOverflowYSubscription =
      windowService.appContentOverflowYEvent.subscribe(
        (overflowType: string) => (this.appContentOverflowY = overflowType)
      );

      this.accountLoginEventSubscription = 
        accountService.loginEvent.subscribe(
          (auth:AuthConfirmation) => {
            this.userLoggedIn = true;
          },
          
          (error:Error) => {console.log(error.message)}
        );
  }

  ngOnInit(): void {
    this.theme.setSideNavEl(this.sideNav);
    if(this.cookiesService.getCookie('jwt')) {
      this.userLoggedIn = true;
    }
  }

  @HostListener('window:resize')
  private onWindowResize(): void {
    this.windowSize.x = window.innerWidth;
    this.windowSize.y = window.innerHeight;
    this.windowService.setWindowSize(this.windowSize);
    this.checkAndSetNavBarSize();
  }

  private checkAndSetNavBarSize(): void {
    if (this.windowSize.x < this.mobileScreenSize) {
      this.isDesktop = false;
    }
    else {
      this.isDesktop = true;
    } 
  }

  public logoutUser(): void {
    this.cookiesService.deleteAllCookies();
    this.userLoggedIn = false;
  }

  // ---- When theme in articles is changed the side nav reacts accordingly
  @HostListener('window:message', ['$event'])
  onThemeChange(e: any): void {
    //-- origin gives the domain the message comes from. 
    // Eg in test origin === http://localhost:4200
    if (e.origin === origin) {
      if (typeof e.data !== 'string') return;

      if (e.data === 'iframe-dark-theme') {
        this.theme.setTheme(this.sideNav.nativeElement, this.theme.themes.dark);
      } else if (e.data === 'iframe-light-theme') {
        this.theme.setTheme(
          this.sideNav.nativeElement,
          this.theme.themes.light
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.errorsEventSubscription.unsubscribe();
    this.titleEventSubscription.unsubscribe();
    this.appContentOverflowYSubscription.unsubscribe();
  }
}
