import { Component, OnInit } from '@angular/core';
import { Vector } from 'src/app/interface/interfaces';
import { ScratchPadService } from 'src/app/services/scratch-pad.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  public scratchPads:ScratchPads[] = [];

  constructor(private scratchPadService: ScratchPadService) {}

  public addNewScratchPad(dimensions:Vector, position:Vector) {
    this.scratchPads.push({
      id: `scratch-pad-${ScratchPadService.generateScratchPadId()}`,
      dimensions: dimensions,
      position: position
    });
  }

  ngOnInit(): void {}
}

interface ScratchPads{
  id:string;
  dimensions:Vector;
  position:Vector;
}