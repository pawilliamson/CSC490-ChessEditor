// File: board.component.ts
import { FEN } from '../fen';
import{ PieceComponent } from '../piece/piece.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem, CdkDragStart }from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.css']
})

/**
 * Class: BoardComponent
 * Implements: OnInit, FEN
 * 
 * Structure for chessboard
 * 
 * 
 */
export class BoardComponent implements OnInit, FEN{
	primaryColor : string = "bg-primary";
	secondaryColor: string = "bg-secondary";
	pieceToAdd: string | unknown;
	colorToAdd: string | unknown;
	noStack:boolean = false;	
	rows: Array < Row > = [];
	
	test_counter: number = 0;

	public madeMove = (cell:any) => {return cell};

	/*
	 * Function: addRow
	 * 
	 * Returns a row with cells having alternating style classes.
	 * 
	 */
	addRow(classA: string, classB: string, fen: string) {
		let cells: number = 8;
		let y: number = 0;
		let temp: Row = new Row();
		let counter = 0;
		let counter2 = 0;
		for (; y < cells; y++) {
			let fs = fen.charAt(counter);
			if (!isNaN(Number(fs))) {
				if (counter2 == 0) {
					counter2++;
				}
				if (counter2 == Number(fs)) {
					counter2 = 0;
					counter++;
				} else {
					counter2++;
				}

			} else {
				counter++;
			}
			let a = new Cell();
			if (y % 2 == 0) {
				a.style = classA;
			} else {
				a.style = classB;
			}
			a.setFEN((isNaN(Number(fs)) ? fs : ""))
			a.y = this.rows.length;
			a.x = y;
			if(!(this.madeMove === null))
				a.madeMove = () => {this.madeMove(a)};
			
			temp.addCell(a);
		}


		return temp;
	}
	
	/**
	 * Function: memo
	 *
	 * Used for testing
	 *
	 * (DEMO_REMOVE)
	 */
	memo() {
		if (this.test_counter == 0) {
			this.move(0, 1, 0, 2);
			this.test_counter++;
			this.printFENString();
		} else {
			if (this.test_counter == 1) {
				this.test_counter = 3;
				this.generateBoard("r1b1k1nr/p2p1pNp/n2B4/1p1NP2P/6P1/3P1Q2/P1P1K3/q5b1");
				this.printFENString();
			} else {
				if (this.test_counter == 3) {
					this.generateBoard();
					this.test_counter = 0;
				}
			}
		}
	}

	
	/**
	 * Function: move()
	 * Parameters: x1, y1, x2, y2
	 *
	 * Moves piece from cell defined by (x1, y1) to cell defined
	 * by (x2, y2). 
	 */
	move(x1: number, y1: number, x2: number, y2: number) {
		let temp = this.rows[y1].cells[x1].toFENString();
		this.rows[y1].cells[x1].setFEN("");
		this.rows[y2].cells[x2].setFEN(temp);
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
	generateBoard(startingPos? : Partial<string>){
		this.rows = [];
		if(!startingPos){
			startingPos = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
		}
		let num: number = 8;
		let counter: number = 0;
		let fen = startingPos.split("/")
		for (; counter < num; counter++) {
			if (counter % 2 == 0) {
				this.rows.push(this.addRow(this.primaryColor, this.secondaryColor,
					fen[counter]));
			} else {
				this.rows.push(this.addRow(this.secondaryColor, this.primaryColor, 
					fen[counter]));
			}
		}
		this.printFENString();
	}

	/**
	 * Function: constructor
	 *
	 */
	constructor() {

	}
	
	/**
	 * Function: printFENString()
	 * 
	 * Prints the output of toFENString in the developer console
	 */
	printFENString() {
		console.log(this.toFENString());
	}
	
	/**
	 * Function: toFENString()
	 *
	 * Returns the position of all pieces in a FEN string.
	 */
	toFENString() {
		let i: number = 0;
		let j: number = 0;
		let length = 8;
		let output = "";

		for (; i < length; i++) {
			output += this.rows[i].toFENString() + (i + 1 == length ? "" : "/");
		}
		return output;
	}
	/**
	 * Function: ngOnInit
	 */
	ngOnInit(): void {
		this.generateBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
		console.log(this.toFENString());
	}
}


/**
 * Class: Row
 * 
 * Structure for rows.
 */
class Row implements FEN{

	cells: Array < Cell > = [];

	toFENString() {
		let out = "";
		let i = 0;
		let counter = 0;
		for (; i < this.cells.length; i++) {
			let z = this.cells[i].toFENString();
			if (z == "" || z == null) {
				counter += 1;
			} else {
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
		return out;
	}


	/**
	 * Function: getCell()
	 * 
	 * Parameters:
	 * - pos: number - position in rows
	 *
	 * Returns the cell if found, else returns -1.
	 **/
	getCell(pos: number) {
		if (this.cells.length < pos || pos < 0) {
			return -1;
		}
		return this.cells[pos];
	}

	/**
	 * Function: addCell
	 * 
	 * Parameters:
	 * 
	 * - cell 
	 */
	addCell(cell: Cell) {
		this.cells.push(cell);
	}

	/**
	 * Function: constructor
	 */
	constructor() {

	}
}
class Cell implements FEN{
	style = "";
	pieces:Array<string> = [""];
	x:number = -1;
	y:number = -1;
	public madeMove = () => {};
	/**
	 * Function: getPieces
	 *
	 * Returns first character in the pieces array
	 */
	getPieces(){
	
		 return this.pieces[0]
	 
	}


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
		return this.pieces[0];
	}
	/**
	 * Function: toFENString()
	 * 
	 * Returns FEN String of cell
	 */
	toFENString(){
		return this.pieces[0]; 
	}
	
	/**
	 * Function: drop
	 */
	drop(event: CdkDragDrop<string[]>) {
		let before = this.getPieces();
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data, event.container.data, 
				event.previousIndex, event.currentIndex);

		}
		console.log(before);
		console.log(this.getPieces())
		if(before && this.getPieces())
		if (before == this.getPieces()){
			this.pieces.shift();
		}else{
			this.pieces.pop();
		}
		if(this.madeMove){
		 this.madeMove();
		 console.log("WELL, I MADE IT!");
		}
	
	}


	/**
	 * Function: constructor
	 *
	 */
	constructor(){}

	/**
	 * Function: setFEN
	 *
	 */
	setFEN(fen:string){
		this.pieces[0] = fen;
	}

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

