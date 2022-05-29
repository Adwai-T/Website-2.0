import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScratchPadComponent } from './scratch-pad/scratch-pad.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    ScratchPadComponent,
  ],
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,
    DragDropModule,
  ],
  exports: [
    ScratchPadComponent,
  ]
})
export class SharedModule { }
