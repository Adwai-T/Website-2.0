import { EventEmitter, Injectable } from '@angular/core';
import { Vector } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  private windowSize:Vector = { x:0, y:0 };
  private appContentOverflowY:string = "auto";
  
  public windowSizeChangeEvent:EventEmitter<Vector> = new EventEmitter();
  public appContentOverflowYEvent:EventEmitter<string> = new EventEmitter();

  constructor() { }

  public setWindowSize(size:Vector) :void{
    this.windowSize = size;
    this.windowSizeChangeEvent.emit(this.windowSize);
  }

  public getWindowSize(): Vector{
    return this.windowSize;
  }

  public setAppContentOverflowY(overflow:string):void {
    this.appContentOverflowY = overflow;
    this.appContentOverflowYEvent.emit(this.appContentOverflowY);
  }

  public getAppContentOverflowY():string {
    return this.appContentOverflowY;
  }
}
