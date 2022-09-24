import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { urls } from '../objects/urls';
import { AccountService } from './account.service';
import { CookiesService } from './cookies.service';
import { ErrorsService } from './errors.service';
import { ServerResponse } from '../interface/interfaces';

export interface Feedback {
  id?: string;
  name: string;
  email: string;
  message: string;
  contacted?: boolean;
  messageSend?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(
    private http: HttpClient,
    private account: AccountService,
    private cookies: CookiesService,
    private errors: ErrorsService
  ) {}

  public send(feedback:Feedback) :Observable<ServerResponse> {
    return this.http.post<ServerResponse>(
      urls.contact.send, 
      feedback);
  }

  public getAll(page: number, size: number): Observable<Feedback[]> | null {
    const jwt = this.cookies.getCookie('jwt');
    if (jwt && this.account.isAdmin())
      return this.http.get<Feedback[]>(urls.contact.getAll, {
        params: {
          page: page,
          size: size,
        },
        headers: {
          Authorization: jwt,
        },
      });
    else {
      this.errors.addError({
        code: 0,
        message: 'Please login in and try again.',
      });
      return null;
    }
  }

  public getAllByContacted(
    contacted: boolean,
    page: number,
    size: number
  ): Observable<Feedback[]> | null {
    const jwt = this.cookies.getCookie('jwt');
    if (jwt && this.account.isAdmin())
      return this.http.get<Feedback[]>(urls.contact.getAll, {
        params: {
          contacted: contacted,
          page: page,
          size: size,
        },
        headers: {
          Authorization: jwt,
        },
      });
    else {
      this.errors.addError({
        code: 0,
        message: 'Please login in and try again.',
      });
      return null;
    }
  }

  public delete(id:string): Observable<ServerResponse> | null {
    const jwt = this.cookies.getCookie('jwt');
    if (jwt && this.account.isAdmin())
      return this.http.delete<ServerResponse>(urls.contact.getAll, {
        params: {
          id: id
        },
        headers: {
          Authorization: jwt,
        },
      });
    else {
      this.errors.addError({
        code: 0,
        message: 'Please login in and try again.',
      });
    }
    return null;
  }
}
