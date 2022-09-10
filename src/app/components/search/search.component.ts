import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public searchString:string;

  constructor(private searchService: SearchService) { 
    this.searchString='';
  }

  ngOnInit(): void {
    
  }

  public onSearch(search:string) {
    this.searchService.onSearch(search);
  }

}
