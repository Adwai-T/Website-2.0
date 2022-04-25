import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //Get--> email, name, password, birthdate, 

  //Give--> id-automatically-in-db, location-get-from-api, Authority

  public calanderHeader = "Birthdate";

  constructor() { }

  ngOnInit(): void {
  }

}
