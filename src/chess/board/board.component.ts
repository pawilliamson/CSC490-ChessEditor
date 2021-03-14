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
 */
export class BoardComponent implements OnInit {

  rows:Array<Row> = [];
  /*
   * Function: addRow
   * 
   * Returns a row with the first cell has primary style.
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
 * Returns row with the first cell has secondary style.
 */
	  addRowAlt() {
	  let z:number = 8;
	  let y:number = 0;
	  let temp:Row = new Row();
	  for(; y < z; y++){
	  let a = new Cell();
	  if(y %2 == 0){
		  a.style = "bg-secondary";
	  }else{
		  a.style = "bg-primary";
	  }
	  temp.addCell(a);
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

class Row{
	cells:Array<Cell> = [];
	addCell(cell:Cell){
		this.cells.push(cell);
	}
	constructor(){
		
	}
}

class Cell{
	value:number = 0;
	style:string = "";
	getStyle(){
		return this.style;
	}
	constructor(){}
	
}
