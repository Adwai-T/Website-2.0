import { Component, OnDestroy } from '@angular/core';
import { SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Pages, Page } from 'src/app/objects/pages';
import { FilesService } from 'src/app/services/files.service';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-iframe-container',
  templateUrl: './iframe-container.component.html',
  styleUrls: ['./iframe-container.component.css'],
})
export class IframeContainerComponent implements OnDestroy {

  public url:SafeResourceUrl = this.loadFileService.getSanitizedResourceUrl('');
  private currentPageTitle:string = '';

  constructor(
    private loadFileService: FilesService,
    private navbarService: NavBarService,
    private windowService:WindowService,
  ) {
    this.windowService.setAppContentOverflowY("hidden");
    this.loadPage(Pages.linkedList);
  }

  loadPage(page:Page) :void{
    this.url = this.loadFileService.getSanitizedResourceUrl(page.html);
    this.navbarService.changeTitle(page.title);
    this.navbarService.setUrl('articles/' + page.title.toLowerCase().replace(' ', ''));
  }

  ngOnDestroy(): void {
    this.windowService.setAppContentOverflowY("auto");
  }
}
