import { Component, OnInit } from '@angular/core';

import { Vector } from 'src/app/interface/interfaces';
import {
  ScratchPad,
  ScratchPadService,
} from 'src/app/services/scratch-pad.service';

@Component({
  selector: 'app-scratchpad-dialog-box',
  templateUrl: './scratchpad-dialog-box.component.html',
  styleUrls: ['./scratchpad-dialog-box.component.css']
})
export class ScratchpadDialogBoxComponent implements OnInit {

  public noteOpen: boolean;
  public openScratchPad: ScratchPad = {
    id: 'tempScratchPadId',
    dimensions: {x:100, y:100},
    position: {x: 100, y: 100} ,
  };

  constructor(
  ) {
    this.noteOpen = false;
  }

  ngOnInit(): void {}

  public addNewScratchPad(dimensions: Vector, position: Vector): void {
    this.noteOpen = true;
    this.openScratchPad = {
      dimensions: dimensions,
      position: position,
      id: 'scratchPadTemp'
    }
  }
}
