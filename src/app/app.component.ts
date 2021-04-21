import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  page = 1;
  goHome(){
    this.page = 1;
  }
  goBoard(){
    this.page = 2;
  }
  goGame(){
  this.page = 3;
  }
  title = 'chess-app';
  constructor() {}; 
 }
