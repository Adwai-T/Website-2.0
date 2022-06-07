import { Component, OnInit } from '@angular/core';
import { CookiesService } from '../services/cookies.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private cookieService: CookiesService) {
  }

  ngOnInit(): void {
  }

}
