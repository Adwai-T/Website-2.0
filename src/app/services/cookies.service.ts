import { Injectable } from '@angular/core';

export interface Cookie {
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  private cookies: Cookie[] = [];

  constructor() {}

  public setCookie(cookie: Cookie): void {
    this.cookies = this.getCookiesFromString(document.cookie);

    let existingCookieIndex = this.getCookieIndex(cookie.key);
    if(existingCookieIndex === -1) {
      this.cookies.push(cookie);
    }
    else {
      this.cookies[existingCookieIndex].value = cookie.value;
    }
    document.cookie = cookie.key + '=' + cookie.value + ';' +  'path = /' + ';';
  }

  public getCookie(k: string): string | undefined {
    this.cookies = this.getCookiesFromString(document.cookie);

    for (let i = 0; i < this.cookies.length; i++) {
      if (this.cookies[i].key === k) return this.cookies[i].value;
    }
    return undefined;
  }

  private getCookieIndex(k:string) :number {
    for (let i = 0; i < this.cookies.length; i++) {
      if (this.cookies[i].key === k) return i;
    }
    return -1;
  }

  private getCookiesFromString(c: string): Cookie[] {
    if(!c || c === '' || c === ' ') return [];
    let cookies: Cookie[] = [];
    let arr = c.split('; ');
    arr.forEach((cookie: string) => {
      let cookieArr = cookie.split('=');
      cookies.push({ key: cookieArr[0], value: cookieArr[1] });
    });
    return cookies;
  }

  public deleteAllCookies(): void {
    this.cookies = this.getCookiesFromString(document.cookie);

    this.cookies.forEach(cookie => {
      document.cookie = cookie.key + '=' + ';' +  'path = /' + ';';
    });

    this.cookies = [];
  }
}
