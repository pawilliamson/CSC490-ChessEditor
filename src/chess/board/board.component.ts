import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})



export class BoardComponent implements OnInit {
  counter = 0;
  rownum = 0;
  rows:Array<Row> = [];
  addRow() {
	  let z:number = 8;
	  let y:number = 0;
	  let temp:Row = new Row();
	  for(; y < z; y++){
	  let a = new Cell();
	  a.value = this.counter++;
	  if((y + this.rownum)%2 == 0){
		  a.style = "bg-primary";
	  }else{
		  a.style = "bg-secondary";
	  }
	  temp.addCell(a);
	}
	  return temp;
}
  constructor() { 
	  let i:number = 8;
	  let x:number = 0;
	  for(; x < i; x++){
	this.rownum++;
	  this.rows.push(this.addRow());
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
