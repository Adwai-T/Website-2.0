import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { urls } from '../objects/urls';

export interface User {
  alias:string;
  username:string;
  id?:number;
  password?:string;
  authority?:string;
  jwtId?:string;
  active?:boolean;
}

export interface AuthInfo {
  username:string;
  password:string;
}

export interface AuthConfirmation {
  username:string;
  jwt:string;
}

export interface AuthError {
  code:number;
  message:string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public loginEvent: EventEmitter<AuthConfirmation> = new EventEmitter<AuthConfirmation>();
  private loggedIn: boolean = false;
  private user:User|undefined;
  

  private admin: boolean = false;
  private memeber: boolean = false;

  constructor(private http: HttpClient) { }

  public createNewUser(user :User) :Observable<User> {
    return this.http.post<User>(urls.account.create, user);
  }

  public authenticate(auth: AuthInfo) :Observable<AuthConfirmation> {
    return this.http.post<AuthConfirmation>(urls.auth.base, auth);
  }

  public deleteAccount(userId :number) :void {

  }

  public adminWelcome() :Observable<string> {
    return this.http.get<string>(urls.account.admin);
  }

  public memberWelcome() :Observable<string> {
    return this.http.get<string>(urls.account.member);
  }
  
  public userWelcome() :Observable<string> {
    return this.http.get<string>(urls.account.user);
  }

  public isLoggedIn() :boolean{
    return this.loggedIn;
  }
  public setLoggedIn(loggedIn:boolean) :void {
    this.loggedIn = loggedIn
  }

  public getLoggedInUser() :User|undefined {
    return this.user;
  }
  public setLoggedInUser(user:User) {
    this.user = user;
  }

  public isAdmin() {
    return this.admin;
  }
  public setAdmin(isAdmin:boolean) {
    this.admin = isAdmin;
  } 

}
