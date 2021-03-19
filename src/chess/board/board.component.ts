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
 * Note:
 * 
 * This component uses an internal array of CellComponent to store
 * and generate the chessboard.
 * 
 * 
 */
export class BoardComponent implements OnInit {

	rows: Array < Row > = [];
	/*
	 * Function: addRow
	 * 
	 * Returns a row with the first cell having primary style.
	 * 
	 */
	addRow() {
		let z: number = 8;
		let y: number = 0;
		let temp: Row = new Row();
		for (; y < z; y++) {
			let a = new CellComponent();
			if (y % 2 == 0) {
				a.style = "bg-primary";
			} else {
				a.style = "bg-secondary";
			}
			temp.addCell(a);
		}
		return temp;
	}
	/*
	 * Function: addRowAlt
	 * 
	 * Returns a row with the first cell having secondary style.
	 */
	addRowAlt() {
		let size: number = 8;
		let i: number = 0;
		let temp: Row = new Row();
		for (; i < size; i++) {
			let cell = new CellComponent();
			if (i % 2 == 0) {
				cell.style = "bg-secondary";
			} else {
				cell.style = "bg-primary";
			}
			temp.addCell(cell);
		}
		return temp;
	}
	
	/**
	* Function: generateBoard()
	* (PLACEHOLDER)
	*/
	generateBoard(){}
	constructor() {
		
	}

	ngOnInit(): void {
		let rows = 8;
		let i = 0;
		for (; i < rows; i++) {
			if (i % 2 == 0) {
				this.rows.push(this.addRow());
			} else {
				this.rows.push(this.addRowAlt());
			}
		}
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