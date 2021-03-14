// File: chess.module.ts
/**
 * Class: Chess Module
 * 
 * Contains components required to generate a chess board with pieces.
 * 
 * Components:
 * 
 * - <BoardComponent> 
 * - PieceComponent (Not Implemented)
 * - RowComponent (Not Implemented)
 * - <CellComponent>
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
	PieceComponent
}
from './piece/piece.component';
import {
	RowComponent
}
from './row/row.component';
import {
	CellComponent
}
from './cell/cell.component';



@NgModule({
	declarations: [BoardComponent, PieceComponent, RowComponent, CellComponent],
	imports: [
		CommonModule
	],
	exports: [BoardComponent, CellComponent],
	bootstrap: [BoardComponent, CellComponent],
})
export class ChessModule {
	
}
