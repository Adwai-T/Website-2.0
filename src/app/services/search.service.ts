import { Injectable, EventEmitter } from '@angular/core';

import { ErrorsService } from './errors.service';
import { INDEX } from '../objects';

export interface SearchResult {
  linkText: string;
  href: string;
  description?: string;
}

export interface searchResultObject {
  main: SearchResult[];
  other: SearchResult[];
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private index: any = INDEX;
  private topics: string[] = Object.keys(INDEX);
  private currentSearchResult :searchResultObject = {main:[], other:[]}; 

  public searchEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private errorsService: ErrorsService) { }

  public onSearch(searchString: string): void {
    if (searchString.length < 5) {
      this.errorsService.addError({
        code: 0,
        message: 'Search string must atleast be 5 characters long.',
      });
      return;
    }
    this.currentSearchResult = this.searchFor(searchString);
    this.searchEvent.emit(true);
  }

  private searchFor(searchString: string): searchResultObject {
    const mainResults: SearchResult[] = [];
    const otherResults: SearchResult[] = [];
    const resultsObject = { main: mainResults, other: otherResults };
    let mainSearchTopic = '';

    const searchWords = searchString.toLowerCase().split(' ');
    for (let topic of this.topics) {
      for (let searchWord of searchWords) {
        if (topic.includes(searchWord)) {
          mainResults.push({ linkText: topic, href: topic });
          mainSearchTopic = topic;
          continue;
        }

        for (let subtopic of Object.keys(this.index[topic])) {
          if (subtopic.includes(searchWord)) {
            if (topic == mainSearchTopic) {
              mainResults.push({
                linkText: subtopic,
                href: topic.concat(this.index[topic][subtopic]),
              });
            } else {
              otherResults.push({
                linkText: subtopic,
                href: topic.concat(this.index[topic][subtopic]),
              });
            }
          }
        }
      }
    }
    return resultsObject;
  }

  public getCurrentSearchResult() :searchResultObject {
    return this.currentSearchResult;
  }
}
