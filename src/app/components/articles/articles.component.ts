import { Component, OnInit } from '@angular/core';
import { PRIMARY_OUTLET, Router } from '@angular/router';
import { Page, Pages } from 'src/app/objects/pages';
import { backEndDev, databases, frontEndDev, languages, salesforce, Topic, utilities } from 'src/app/objects/topics';
import { IframePageService } from 'src/app/services/iframe-page.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css', '../../sharedCss/articlesAndProjects.css'],
})
export class ArticlesComponent implements OnInit {
  public frontDev: Topic[] = frontEndDev;
  public backDev: Topic[] = backEndDev;
  public salesforce: Topic[] = salesforce;
  public languages: Topic[] = languages;
  public databases: Topic[] = databases
  public utilities: Topic[] = utilities;

  constructor(
    private iframe: IframePageService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    //--- Navigate to the page directly according to url
    let url = this.router.url;
    let urlTree= this.router.parseUrl(url);
    let segment = urlTree.root.children[PRIMARY_OUTLET].segments[1];
    if(segment) {
      this.onCardClick(Pages[segment.path]);
    }
  }

  public onCardClick(page: Page): void {
    this.iframe.setCurrentPage(page);
    this.router.navigate(['iframe']);
  }
}
