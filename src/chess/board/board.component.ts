// File: board.component.ts

import {
	Component, OnInit
}
from '@angular/core';

import {
	CellComponent
}from '../cell/cell.component';
@
Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.css']
})


/**
 * Class: BoardComponent
 * Implements: OnInit
 * 
 * Structure for chessboard
 * 
 *
 * TODO:
 * 
 * Change so the css classes can be changed to different styles.
 */
export class BoardComponent implements OnInit {

	rows: Array < Row > = [];
	/*
	 * Function: addRow
	 * 
	 * Returns a row with the first cell having primary style.
	 * 
	 */
	addRow(classA:string, classB:string) {
		let z: number = 8;
		let y: number = 0;
		let temp: Row = new Row();
		for (; y < z; y++) {
			let a = new CellComponent();
			if (y % 2 == 0) {
				a.style = classA;
			} else {
				a.style = classB;
			}
			temp.addCell(a);
		}
		return temp;
	}
	
	
	/**
	* Function: generateBoard()
	* 
	* Parameters:
	* 
	* - classA:string
	* - classB:string
	*
	* Creates the chessboard with alternating rows.
	*/
	generateBoard(classA:string, classB:string){
		let num:number = 8;
		let counter: number = 0;
		for(; counter < num; counter++){
			if(counter%2==0){
				this.rows.push(this.addRow(classA, classB));
			}else{
				this.rows.push(this.addRow(classB, classA));
			}
		}
	}
	constructor() {
		
	}
	/**
	* Function: toFENString()
	*
	* (PLACEHOLDER)
	*/
	toFENString(){
	return "";
	}

	ngOnInit(): void {
		this.generateBoard("bg-primary", "bg-secondary");
	}
}


/**
 * Class: Row
 * 
 * Structure for rows.
 */
class Row {

	cells: Array < CellComponent > = [];



	/**
	  Function: getCell

	  Returns the cell if found, else returns -1
	**/
	getCell(num:number){
		if(this.cells.length < num || num < 0){
			return -1;	
		}
		return this.cells[num];
	}

	/**
	 * Function: addCell
	 * 
	 * Parameters:
	 * 
	 * - cell 
	 */
	addCell(cell: CellComponent) {
			this.cells.push(cell);
		}
		
		/**
		 * Function: constructor
		 */
	constructor() {

	}
}

class Fen{
	
}
