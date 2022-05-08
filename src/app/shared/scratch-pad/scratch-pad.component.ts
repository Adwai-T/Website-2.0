import {
  Component,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Vector } from 'src/app/interface/interfaces';

@Component({
  selector: 'app-scratch-pad',
  templateUrl: './scratch-pad.component.html',
  styleUrls: ['./scratch-pad.component.css'],
})
export class ScratchPadComponent implements OnInit {
  @Input('id')
  public scratchPadId: string = 'scratchPad';
  @Input('position')
  public position: Vector = { x: 100, y: 100 };
  @Input('dimensions')
  public dimensions: Vector = { x: 200, y: 200 };
  @Input('z-index')
  public zIndex: number = 5;
  @Input('topic')
  public topic: string = 'Topic';
  @Input('date')
  public date: Date = new Date();
  //getMonth() return value from 0-11(why javascript).
  //getDate() returns value from 1-31
  public dateString: string = 
      `${this.date.getDate()}-${this.date.getMonth()+1}-${this.date.getFullYear()}`;

  private mouseUp: boolean = true;
  private mouseDown: boolean = false;
  private resizeElement: any = '';
  private initialMousePosition: Vector = {
    x: 0,
    y: 0,
  };
  private currentMousePosition: Vector = {
    x: 0,
    y: 0,
  };

  constructor() {}

  ngOnInit(): void {}

  private down(e:MouseEvent|Touch):void {
    this.mouseUp = false;
    this.resizeElement = document.getElementById(`${this.scratchPadId}-resize`);
    if (e.target === this.resizeElement) {
      this.mouseDown = true;
    }
  }
  private move(e:MouseEvent|Touch):void {
    this.currentMousePosition.x = e.clientX;
    this.currentMousePosition.y = e.clientY;
    if (this.mouseDown && !this.mouseUp) {
      const resizeElementPosition = this.resizeElement.getBoundingClientRect();
      this.initialMousePosition.x = resizeElementPosition.right;
      this.initialMousePosition.y = resizeElementPosition.bottom;

      let dx = this.currentMousePosition.x - this.initialMousePosition.x;
      let dy = this.currentMousePosition.y - this.initialMousePosition.y;

      this.dimensions.x = this.dimensions.x + dx;
      this.dimensions.y = this.dimensions.y + dy;
    }
  }
  private up(e:MouseEvent|Touch):void {
    this.mouseUp = true;
    this.mouseDown = false;
  }

  @HostListener('mousedown', ['$event'])
  private resizeScratchPad(e: MouseEvent): void {
    this.down(e);
  }

  @HostListener('window:mousemove', ['$event'])
  private mouseMoveHandler(e: MouseEvent): void {
    this.move(e);
  }

  @HostListener('window:mouseup', ['$event'])
  private mouseUpHandler(e: MouseEvent): void {
    this.up(e);
  }

  @HostListener('touchstart', ['$event'])
  private touchStartHandler(e: TouchEvent):void {
    if(e.type === 'touchstart') {
      this.down(e.touches[0]);
    }
  }

  @HostListener('touchmove', ['$event'])
  private touchMoveHandler(e: TouchEvent):void {
    if(e.type === 'touchmove') {
      this.move(e.touches[0]);
    }
  }

  @HostListener('touchend', ['$event'])
  private touchEndHandler(e: TouchEvent):void {
    if(e.type === 'touchend' || e.type === 'touchcancel') {
      this.up(e.touches[0]);
    }
  }

  @HostListener('touchcancel', ['$event'])
  private touchCancelHandler(e: TouchEvent):void {
    if(e.type === 'touchcancel') {
      this.up(e.touches[0]);
    }
  }
}
