import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private theme: string;
  public themeEvent:EventEmitter<string> = new EventEmitter();

  constructor() {
    this.theme = 'light';
  }

  public setTheme(themeName:string):void {
    if(themeName == 'dark' || themeName == 'light') {
      this.theme = themeName;
      this.themeEvent.emit(this.theme);
    }
  }

  public getTheme():string {
    return this.theme;
  }
}
