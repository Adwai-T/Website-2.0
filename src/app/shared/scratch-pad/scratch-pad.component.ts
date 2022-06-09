import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

export interface Note {
  title: string;
  content: string;
  backgroundColor: string;
  folder: string;
}

import { Vector } from 'src/app/interface/interfaces';
import { ErrorsService } from 'src/app/services/errors.service';
import { ScratchPadService } from 'src/app/services/scratch-pad.service';

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
  @Input('date')
  public date: Date = new Date();
  //getMonth() return value from 0-11(why javascript).
  //getDate() returns value from 1-31
  public dateString: string = `${this.date.getDate()}-${
    this.date.getMonth() + 1
  }-${this.date.getFullYear()}`;

  @ViewChild('scratchPad') private scratchPadElement!: ElementRef;
  @ViewChild('scratchPadTitle') private titleElement!: ElementRef;
  @ViewChild('content') private editableContentElement!: ElementRef;

  public title: string = 'title';

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

  constructor(
    private scratchPadService: ScratchPadService,
    private renderer: Renderer2,
    private errorService: ErrorsService
  ) {}

  ngOnInit(): void {}

  public clear(): void {
    this.editableContentElement.nativeElement.innerText = '';
  }

  public save(update: boolean): void {
    const note: Note = {
      title: this.titleElement.nativeElement.innerText,
      content: this.editableContentElement.nativeElement.innerText,
      backgroundColor:
        this.scratchPadElement.nativeElement.style.backgroundColor,
      folder: 'other',
    };

    if (note.backgroundColor === '' || note.backgroundColor === undefined)
      note.backgroundColor = 'white';

    if (note.title && note.title !== 'title') {

      if (
        localStorage.getItem(this.titleElement.nativeElement.innerText) &&
        !update
      ) {
        this.errorService.addError({
          code: 0,
          message:
            'The note with this title already exists. Please use Update.',
        });
        return;
      }

      localStorage.setItem(note.title, JSON.stringify(note));
      this.errorService.addError({code:0, message:`Note ${note.title} saved successfully.`});
    }
    else {
      this.errorService.addError({ code: 0, message: 'Please add a title.' });
    }
  }

  public close(): void {
    this.scratchPadService.removeScratchPadById(this.scratchPadId);
  }

  public saveAndClose(): void {
    this.save(false);
    this.close();
  }

  public updateAndClose(): void {
    this.save(true);
    this.close();
  }

  public changeColor(color: string): void {
    this.renderer.setStyle(
      this.scratchPadElement.nativeElement,
      'background-color',
      color
    );
    this.renderer.setStyle(
      this.editableContentElement.nativeElement,
      'background-color',
      color
    );
    if (color !== 'white' && color !== 'lightyellow')
      this.renderer.setStyle(
        this.scratchPadElement.nativeElement,
        'color',
        'white'
      );
    else
      this.renderer.setStyle(
        this.scratchPadElement.nativeElement,
        'color',
        'black'
      );
  }

  public copyContentToClipboard() :void {
    navigator.clipboard.writeText(this.editableContentElement.nativeElement.innerText);
  }

  private down(e: MouseEvent | Touch): void {
    this.mouseUp = false;
    this.resizeElement = document.getElementById(`${this.scratchPadId}-resize`);
    if (e.target === this.resizeElement) {
      this.mouseDown = true;
    }
  }
  private move(e: MouseEvent | Touch): void {
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
  private up(e: MouseEvent | Touch): void {
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
  private touchStartHandler(e: TouchEvent): void {
    if (e.type === 'touchstart') {
      this.down(e.touches[0]);
    }
  }

  @HostListener('touchmove', ['$event'])
  private touchMoveHandler(e: TouchEvent): void {
    if (e.type === 'touchmove') {
      this.move(e.touches[0]);
    }
  }

  @HostListener('touchend', ['$event'])
  private touchEndHandler(e: TouchEvent): void {
    if (e.type === 'touchend' || e.type === 'touchcancel') {
      this.up(e.touches[0]);
    }
  }

  @HostListener('touchcancel', ['$event'])
  private touchCancelHandler(e: TouchEvent): void {
    if (e.type === 'touchcancel') {
      this.up(e.touches[0]);
    }
  }
}
