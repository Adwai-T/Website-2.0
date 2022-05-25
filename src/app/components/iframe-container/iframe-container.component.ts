import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Page } from 'src/app/objects/pages';
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

  @ViewChild('containerIframe') private iframe!: ElementRef;
  private currentPageTitle: string = '';

  constructor(
    private loadFileService: FilesService,
    private navbarService: NavBarService,
    private windowService: WindowService,
    private pageService: IframePageService,
    private themeService: ThemeService
  ) {
    this.loadPage(pageService.getCurrentPage());
    this.windowService.setAppContentOverflowY('hidden');
    pageService.getPageUrlEvent.subscribe((page: Page) => {
      this.loadPage(page);
    });
  }

  loadPage(page: Page): void {
    this.url = this.loadFileService.getSanitizedResourceUrl(page.html);
    this.navbarService.changeTitle(page.title);
    this.navbarService.setUrl(
      'articles/' + page.title.toLowerCase().replace(' ', '')
    );
  }

  ngOnDestroy(): void {
    this.windowService.setAppContentOverflowY('auto');
    this.themeService.setTheme(
      this.themeService.getSideNavEl()?.nativeElement,
      this.themeService.themes.light
    );
  }
}
