import {
	Component, OnInit, Input, Output, EventEmitter
}
from '@angular/core';

import {
	PieceComponent
}
from '../piece/piece.component';
import {
     CdkDragDrop, moveItemInArray, transferArrayItem
}from '@angular/cdk/drag-drop';
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
	
	opiece:string = "";
	
	@Input() piece: string = "";
	pieces = [ this.piece ];
	@Output() 
	pieceMoved = new EventEmitter<string>();
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
   
   printout(event:any){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    console.log(this.pieces);
    this.piece = this.pieces[0];
    this.opiece = this.piece;
    this.pieceMoved.emit(this.piece);
  }
  
    
    setFEN(fen:string){
    /*	piece = new PieceComponent();
    	this.piece.setFEN(fen);
    	*/
    	this.piece = fen;
    }
	constructor() {
	
	}
	ngOnChanges(){
		this.pieces = [this.piece];
		this.setFEN(this.piece);
		this.opiece = this.piece;
	}
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
