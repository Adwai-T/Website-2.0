import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScratchPadService {

  private static scratchPadCount:number = 0;

  constructor() { }

  public static generateScratchPadId():number {
    return this.scratchPadCount++;
  }
  
}
