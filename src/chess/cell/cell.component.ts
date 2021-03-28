import {
	Component, OnInit, Input
}
from '@angular/core';

import {
	PieceComponent
}
from '../piece/piece.component';

@Component({
	selector: 'app-cell',
	templateUrl: './cell.component.html',
	styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css', '../board/board.component.css', ],

})

/**
 * Class: CellComponent
 * 
 * Variables:
 *
 * - style:string = ""; @Input("init");
 */
export class CellComponent implements OnInit {

	@Input("init")
	style: string = "";
	
	@Input("piece")
	piece = "";
	
    /**
     * setPiece()
     * 
     * Sets piece component to enumerated integer
     */
	/*setPiece(num: number) {
		this.piece.set(num)
	}*/
	/**
     * Function: getPiece()
     * 
     * Returns PieceComponent
     */
	getPiece() {
		return this.piece;
	}
	/**
     * Function: toFENString()
     * 
     * Returns FEN String of cell
     */
	toFENString(){
       return this.piece; 
    }
    
    setFEN(fen:string){
    /*	piece = new PieceComponent();
    	this.piece.setFEN(fen);
    	*/
    	this.piece = fen;
    }
	constructor() {}

	ngOnInit(): void {}
		/*
		 * Function: getStyle
		 * 
		 * Returns a string containing the cell's style.
		 * 
		 */
	getStyle() {
		return "col " + this.style;
	}

}
