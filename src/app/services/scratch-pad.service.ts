import { Injectable } from '@angular/core';

import { Vector } from '../interface/interfaces';

export interface ScratchPad {
  id: string;
  dimensions: Vector;
  position: Vector;
}

@Injectable({
  providedIn: 'root',
})
export class ScratchPadService {
  private scratchPads: ScratchPad[] = [];

  private static scratchPadCount: number = 0;

  constructor() {}

  public static generateScratchPadId(): number {
    return this.scratchPadCount++;
  }

  public addNewScratchPad(dimensions: Vector, position: Vector) {
    this.scratchPads.push({
      id: `scratch-pad-${ScratchPadService.generateScratchPadId()}`,
      dimensions: dimensions,
      position: position,
    });
  }

  public removeScratchPadById(id :string) :void {
    for(let i = 0, j = 0; i < this.scratchPads.length; i++, j++) {
      if(this.scratchPads[i].id === id) {
        j--;
        continue;
      }
      this.scratchPads[j] = this.scratchPads[i];
    }
    this.scratchPads.pop();
  }

  public getAllActiveScratchPads() :ScratchPad[] {
    return this.scratchPads;
  }
}
