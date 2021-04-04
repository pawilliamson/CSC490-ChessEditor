import { Component } from '@angular/core';
import { ChessModule } from '../chess/chess.module'
import {HeaderComponent} from '../app/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chess-app';
}
