import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-result-dialog',
  templateUrl: './search-result-dialog.component.html',
  styleUrls: ['./search-result-dialog.component.css']
})
export class SearchResultDialogComponent implements OnInit {

  constructor(public searchDialogRef: MatDialogRef<SearchResultDialogComponent>) { 
  }

  ngOnInit(): void { }
}