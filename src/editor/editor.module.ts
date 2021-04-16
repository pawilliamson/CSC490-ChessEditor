import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessModule } from '../chess/chess.module';
import { CreatorComponent } from './creator/creator.component';
import {
	DragDropModule
	} from '@angular/cdk/drag-drop';
export {CreatorComponent};
@NgModule({
  declarations: [CreatorComponent],
  imports: [
    CommonModule, ChessModule, DragDropModule
  ],
  exports:[
   CreatorComponent
  ]
})
export class EditorModule { }
