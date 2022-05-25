import { ElementRef, EventEmitter, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private currentTheme: string;
  private renderer: Renderer2;
  private sideNav: ElementRef|null = null;

  //Used as class for style css
  public themes = {
    light : "light-theme",
    dark : "dark-theme",
  }

  public darkThemeColors = {
    background : "#282a36",
    foreground : "#f8f8f2",
    heading : "#ff79c6"
  }

  public themeEvent:EventEmitter<string> = new EventEmitter();

  constructor(private rendererFactory: RendererFactory2) {
    this.currentTheme = this.themes.light;
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public setTheme(el:HTMLElement, themeName:string):void {
    if(themeName === this.themes.dark) {
      this.currentTheme = themeName;
      this.renderer.addClass(el, this.themes.dark);
      this.themeEvent.emit(this.currentTheme);
    }
    else {
      this.renderer.removeClass(el, this.currentTheme);
      this.currentTheme = this.themes.light;
      this.themeEvent.emit(this.currentTheme);
    }
  }

  public getSideNavEl(): ElementRef|null {
    return this.sideNav;
  }

  public setSideNavEl(el: ElementRef): void {
    this.sideNav = el;
  }

  public getCurrentTheme():string {
    return this.currentTheme;
  }
}
