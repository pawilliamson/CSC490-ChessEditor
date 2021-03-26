
import { Component, OnInit, Input } from '@angular/core';
import { PieceComponent } from '../piece/piece.component';
@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css','../board/board.component.css',],

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
  style:string = "";
  @Input("piece")
  piece:PieceComponent = new PieceComponent();
  setPiece(num:number){
  	this.piece.set(num)
  }
  getPiece(){
		return this.piece;  
  }
  constructor() { }

  ngOnInit(): void {
  }
  /*
   * Function: getStyle
   * 
   * Returns a string containing the cell's style.
   * 
   */
  getStyle(){
	  return "col " + this.style;
  }

}

