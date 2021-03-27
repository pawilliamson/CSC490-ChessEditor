// File: board.component.ts

import {
	Component, OnInit
}
from '@angular/core';

import {
	CellComponent
}
from '../cell/cell.component';@
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
	addRow(classA: string, classB: string, fen:string) {
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
			a.setFEN(fen.charAt(y))
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
	generateBoard(classA: string, classB: string, startingPos="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR") {
		let num: number = 8;
		let counter: number = 0;
		let fen = startingPos.split("/")
		console.log(fen);
		for (; counter < num; counter++) {
			if (counter % 2 == 0) {
				this.rows.push(this.addRow(classA, classB, fen[counter]));
			} else {
				this.rows.push(this.addRow(classB, classA, fen[counter]));
			}
		}
	}
	constructor() {

	}
	printFENString() {
		console.log(this.toFENString());
	}
	/**
	 * Function: toFENString()
	 *
	 * (PLACEHOLDER)
	 */
	toFENString() {
		let i: number = 0;
		let j: number = 0;
		let length = 8;
		let output = "";

		for (; i < length; i++) {
			
			output += this.rows[i].toFENString() + (i+1==length?"":"/");
		}
		return output;
	}

	ngOnInit(): void {
		this.generateBoard("bg-primary", "bg-secondary");
		console.log(this.toFENString());
	}
}


/**
 * Class: Row
 * 
 * Structure for rows.
 */
class Row {

	cells: Array < CellComponent > = [];

	toFENString() {
		let out = "";
		let i = 0;
		let counter = 0;
		for (; i < this.cells.length; i++) {
			let z = this.cells[i].toFENString();
			if (z == "") {
				counter += 1;
			} else {
				console.log("TEST")
				if (counter > 0) {
					out = out.concat(counter.toString());
					counter = 0;
				}
				out = out.concat(z.toString());
			}
		}
		if (counter > 0) {
			return out.concat(counter.toString())
		}
		console.log(out);
		return out;
	}


	/**
	  Function: getCell

	  Returns the cell if found, else returns -1
	**/
	getCell(num: number) {
		if (this.cells.length < num || num < 0) {
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
/**
 * Class: Fen
 * 
 * Placeholder
 **/
class Fen {

}