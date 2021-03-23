
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css','./cell.component.css',],

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

