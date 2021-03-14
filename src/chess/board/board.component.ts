// File: board.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
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
 * This component uses an internal array of cells that is used to store.
 * I am working on transfering this over to a component system and eventually
 * try to switch the generation over to have cell tracking with built-in
 * Angular Directives.
 * 
 * 
 */
export class BoardComponent implements OnInit {

  rows:Array<Row> = [];
  /*
   * Function: addRow
   * 
   * Returns a row with the first cell having primary style.
   * 
   */
  addRow() {
	  let z:number = 8;
	  let y:number = 0;
	  let temp:Row = new Row();
	  for(; y < z; y++){
	  let a = new Cell();
	  if(y %2 == 0){
		  a.style = "bg-primary";
	  }else{
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
	  let size:number = 8;
	  let i:number = 0;
	  let temp:Row = new Row();
	  for(; i < size; i++){
	  let cell = new Cell();
	  if(i %2 == 0){
		  cell.style = "bg-secondary";
	  }else{
		  cell.style = "bg-primary";
	  }
	  temp.addCell(cell);
	}
	  return temp;
}
  constructor() { 
	  let rows = 8;
	  let i = 0;
	  for(; i < rows; i++){
		  if(i % 2 == 0){
			this.rows.push(this.addRow());
	  }else{
		  this.rows.push(this.addRowAlt());
	  }
	  }
  }
	
  ngOnInit(): void {
  }

}
/**
 * Class: Row
 * 
 * Structure for rows.
 */
class Row{
	
	cells:Array<Cell> = [];
	/**
	 * Function: addCell
	 * 
	 * Parameters:
	 * 
	 * - cell 
	 */
	addCell(cell:Cell){
		this.cells.push(cell);
	}
	/**
	 * Function: constructor
	 */
	constructor(){
		
	}
}

/**
 * Class: Cell
 * 
 * 
 */
class Cell{
	value:number = 0;
	style:string = "";
	getStyle(){
		return this.style;
	}
	/*
	 * Function: constructor
	 */
	constructor(){}
	
}
