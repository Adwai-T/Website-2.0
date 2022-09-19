import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Page } from 'src/app/objects/pages';
import { ErrorsService } from 'src/app/services/errors.service';
import { FilesService } from 'src/app/services/files.service';
import { IframePageService } from 'src/app/services/iframe-page.service';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { ThemeService } from 'src/app/services/theme.service';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-iframe-container',
  templateUrl: './iframe-container.component.html',
  styleUrls: ['./iframe-container.component.css'],
})
export class IframeContainerComponent implements OnDestroy {

  public url: SafeResourceUrl =
    this.loadFileService.getSanitizedResourceUrl('');

  private pageEventSubscription: Subscription;

  @ViewChild('containerIframe') private iframe!: ElementRef;
  private currentPageTitle: string = '';

  constructor(
    private loadFileService: FilesService,
    private navbarService: NavBarService,
    private windowService: WindowService,
    private pageService: IframePageService,
    private themeService: ThemeService,
    private errorService: ErrorsService,
  ) {
    this.loadPage(pageService.getCurrentPage());
    this.windowService.setAppContentOverflowY('hidden');
    this.pageEventSubscription = pageService.getPageUrlEvent.subscribe((page: Page) => {
      this.loadPage(page);
    });
  }

  private loadPage(page: Page): void {
    if(!page) {
      this.errorService.addError({message: 'Sorry, Page is no longer available.', code: 0})
      return;
    }
    this.url = this.loadFileService.getSanitizedResourceUrl(page.html + this.pageService.getNavFragment());
    this.navbarService.changeTitle(page.title);

    let navLinkStart = '';
    if(page.navLinkStart) {
      navLinkStart = `${page.navLinkStart}/`
      this.navbarService.setCurrentParentUrl('/' + navLinkStart.slice(0, -1));//remove last `/` and add at start
    }

    this.navbarService.setUrl(
      navLinkStart + page.title.toLowerCase().replace(new RegExp(' ', 'g'), '')
    );
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event:Event) {
    let currentUrl = this.navbarService.getCurrentUrl();
    if(currentUrl === '/iframe') {
      this.navbarService.routerService().navigateByUrl(
        '/'
      );
    }
  }

  ngOnDestroy(): void {
    this.windowService.setAppContentOverflowY('auto');
    this.themeService.setTheme(
      this.themeService.getSideNavEl()?.nativeElement,
      this.themeService.themes.light
    );

    //--- Unsubscriptions
    this.pageEventSubscription.unsubscribe();
  }
}
