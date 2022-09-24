import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { Page, Pages } from 'src/app/objects/pages';
import { IframePageService } from 'src/app/services/iframe-page.service';
import { Subscription } from 'rxjs';
import { Section, Sections } from 'src/app/objects/main-topics';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: [
    './articles.component.css',
    '../../sharedCss/articlesAndProjects.css',
  ],
})
export class ArticlesComponent implements OnInit, OnDestroy {

  public sections:Section[] = Sections;

  private routerEventSubscription: Subscription;

  constructor(
    private iframe: IframePageService,
    private router: Router
  ) {

    //--- User for search, when search links are clicked
    //iframe page is set according to url
    this.routerEventSubscription = this.router.events.subscribe(
      (event) => {
        if(event instanceof NavigationEnd) {
          this.checkUrlAndSetNavigationInformation();
        }
      },
      (err) => {},
      () => {}
    )
  }

  ngOnInit(): void {
    this.checkUrlAndSetNavigationInformation();
  }

  private checkUrlAndSetNavigationInformation(): void {
    //--- Navigate to the page directly according to url
    let url = this.router.url;
    let urlTree = this.router.parseUrl(url);
    let fragment = '';
    if (urlTree.fragment) fragment = '#' + urlTree.fragment;
    let segment = urlTree.root.children[PRIMARY_OUTLET].segments[1];
    if (segment) {
      this.onCardClick(Pages[segment.path], fragment);
    }
  }

  /**
   * When cards are clicked the page is loaded in iframe and navigation is set.
   * @param page Page to be loaded in iframe
   * @param fragment ID of the section of the page to be loaded to eg #h2-1
   */
  public onCardClick(page: Page, fragment: string): void {
    this.iframe.setCurrentPage(page);
    this.iframe.setNavFragment(fragment);
    this.router.navigate(['iframe']);
  }

  ngOnDestroy() :void {
    this.routerEventSubscription.unsubscribe();
  }
}
