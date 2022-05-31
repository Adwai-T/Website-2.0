import { Component, OnInit } from '@angular/core';
import { Vector } from 'src/app/interface/interfaces';

import {
  ScratchPad,
  ScratchPadService,
} from 'src/app/services/scratch-pad.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public scratchPads: ScratchPad[];

  constructor(private scratchPadService: ScratchPadService) {
    this.scratchPads = this.scratchPadService.getAllActiveScratchPads();
  }

  public addNewScratchPad(dimensions: Vector, position: Vector): void {
    this.scratchPadService.addNewScratchPad(dimensions, position);
  }

  ngOnInit(): void {}
}
