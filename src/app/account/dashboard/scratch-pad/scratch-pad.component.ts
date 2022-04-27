import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Vector } from 'src/app/interface/interfaces';

@Component({
  selector: 'app-scratch-pad',
  templateUrl: './scratch-pad.component.html',
  styleUrls: ['./scratch-pad.component.css']
})
export class ScratchPadComponent implements OnInit {

  @Input('id')
  public scratchPadId:string = "scratchPad";
  @Input('width')
  public width:number = 200;
  @Input('height')
  public height:number = 200;

  private mouseUp:boolean = true;
  private mouseDown:boolean = false;
  private resizeElement:any = '';
  private initialMousePosition:Vector = {
    x : 0,
    y : 0,
  }
  private currentMousePosition:Vector = {
    x : 0,
    y : 0,
  }

  constructor() { 
    console.log(this.scratchPadId);
    console.log(this.width);
  }

  ngOnInit(): void {
    
  }

  @HostListener('mousedown', ['$event'])
  private resizeScratchPad(e:MouseEvent):void {
    this.mouseUp = false;
    this.resizeElement = document.getElementById(`${this.scratchPadId}-resize`);
    if(e.target === this.resizeElement) {
      this.mouseDown = true;
    }
  }

  @HostListener('window:mousemove', ['$event']) 
  private mouseMoveHandler(e:MouseEvent) :void{
    this.currentMousePosition.x = e.clientX;
    this.currentMousePosition.y = e.clientY;
    if(this.mouseDown && !this.mouseUp) {

      const resizeElementPosition = this.resizeElement.getBoundingClientRect();
      this.initialMousePosition.x = resizeElementPosition.right;
      this.initialMousePosition.y = resizeElementPosition.bottom;

      let dx = this.currentMousePosition.x - this.initialMousePosition.x;
      let dy = this.currentMousePosition.y - this.initialMousePosition.y;
      
      this.width = this.width + dx;
      this.height = this.height + dy;
    }
  }

  @HostListener('window:mouseup', ['$event']) 
  private mouseUpHandler(e:MouseEvent):void{
    this.mouseUp = true;
    this.mouseDown = false;
  }
}
