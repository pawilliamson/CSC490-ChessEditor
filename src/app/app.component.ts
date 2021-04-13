import { Component } from '@angular/core';
import { ChessModule } from '../chess/chess.module';

import {
     CdkDragDrop, moveItemInArray, transferArrayItem
}from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chess-app';
  ted(){
  console.log("HEEEEEEEELLLOOOOOOOOOOO!!!!!");
  }
}
