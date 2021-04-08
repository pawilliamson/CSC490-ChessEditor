// File: chess.module.ts
/**
 * Class: Chess Module
 * 
 * Contains components required to generate a chess board with pieces.
 * 
 * Components:
 * 
 * - <BoardComponent> 
 * - <PieceComponent>
 * - <CellComponent>
 * - <RowComponent> (Not Implemented)
 * TODO:
 *
 * - ++Implement Pieces++
 * - Add FEN Interpretor/Generator (Module, Service or In )
 * - Research Animations
 * - Create an Algorithm Service
 * - Add User Input
 **/
 
import {
	NgModule
}
from '@angular/core';
import {
	CommonModule
}
from '@angular/common';
import {
	BoardComponent
}
from './board/board.component';
import {
	HomeComponent
}
from './home/home.component';
import {
	PieceComponent
}
from './piece/piece.component';
import {
	Types
}from'./piece/types.enum';
import {
	DragDropModule
	} from '@angular/cdk/drag-drop';
@NgModule({
	declarations: [BoardComponent, PieceComponent, HomeComponent],
	imports: [
		CommonModule, DragDropModule
	],
	exports: [BoardComponent, HomeComponent],
	bootstrap: [BoardComponent, HomeComponent],
})
export class ChessModule {
	
}
