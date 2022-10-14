import { Injectable, EventEmitter } from '@angular/core';

import { ErrorsService } from './errors.service';
import { INDEX } from '../objects';

export type searchResult = Record<string, string>;

export interface searchResultObject {
  main: searchResult;
  other: searchResult;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private index: any = INDEX;
  private topics: string[] = Object.keys(INDEX);
  private currentSearchResult: searchResultObject = { main: {}, other: {} };

  public searchEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private errorsService: ErrorsService) {}

  public onSearch(searchString: string): void {
    if (searchString.length < 4) {
      this.errorsService.addError({
        code: 0,
        message: 'Search string must atleast be 5 characters long.',
      });
      return;
    }
    this.currentSearchResult = this.searchFor(searchString);
    this.searchEvent.emit(true);
  }

  private dontSearchWord : Record<string, boolean> = {
    to : true, it: true, the: true, with: true, of: true,
    from: true, as: true, in: true,
  }

  private searchFor(searchString: string): searchResultObject {
    const mainResults: Record<string, string> = {};
    const otherResults: Record<string, string> = {};
    const resultsObject = { main: mainResults, other: otherResults };
    let mainSearchTopic = '';

    const searchWords = searchString.toLowerCase().split(' ');
    for (let topic of this.topics) {
      for (let searchWord of searchWords) {
        if (this.dontSearchWord[searchWord]) continue;

        if (topic.includes(searchWord)) {
          mainResults[topic] = topic;
          mainSearchTopic = topic;
          continue;
        }

        for (let subtopic of Object.keys(this.index[topic])) {
          if (subtopic.includes(searchWord)) {
            if (topic == mainSearchTopic) {
              mainResults[topic.concat(this.index[topic][subtopic])] = subtopic;
            } else {
              otherResults[topic.concat(this.index[topic][subtopic])] = subtopic;
            }
          }
        }
      }
    }
    return resultsObject;
  }

  public getCurrentSearchResult(): searchResultObject {
    return this.currentSearchResult;
  }
}
