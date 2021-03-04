import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})



export class BoardComponent implements OnInit {
  counter = 1;
  cells:Array<Cell> = [];
  addCell(c:number) {
	  let temp = new Cell();
	  temp.value = c;
	  return temp;
  }
  constructor() { 
	  this.cells.push(this.addCell(1));
	}
  ngOnInit(): void {
  }

}

class Cell{
	value:number = 0;
	constructor(){}
}
