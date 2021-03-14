import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css','./cell.component.css',],

})
export class CellComponent implements OnInit {
	
  @Input("init")
  style:string = "";
  
  constructor() { }

  ngOnInit(): void {
  }
  getStyle(){
	  return "col " + this.style;
  }

}
