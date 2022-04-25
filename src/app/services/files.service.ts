import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private http: HttpClient,
    private sanatizer: DomSanitizer,
  ) { }

  public loadFileAsString(url:string):Observable<string> {
    return this.http.get(url, {responseType:'text'});
  }

  public getSanitizedUrl(url:string){
    return this.sanatizer.bypassSecurityTrustUrl(url);
  }

  public getSanitizedResourceUrl(url:string) {
    return this.sanatizer.bypassSecurityTrustResourceUrl(url);
  }
}
