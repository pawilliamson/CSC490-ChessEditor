// File: chess.module.ts
/**
 * Class: Chess Module
 *
 * Contains components required to generate a chess board with pieces.
 *
 * Components:
 *
 * - <BoardComponent>
 * - <PieceComponent>
 *
 **/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { PieceComponent } from './piece/piece.component';
import { Piece, FEN } from './piece/types.enum';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ValidatorModule } from '../validator/validator.module';

@NgModule({
  declarations: [BoardComponent, PieceComponent, GameComponent, HomeComponent],
  imports: [CommonModule, DragDropModule, ValidatorModule],
  exports: [BoardComponent, HomeComponent, PieceComponent, GameComponent],
  bootstrap: [BoardComponent, HomeComponent, GameComponent],
})
export class ChessModule {}
export { BoardComponent, HomeComponent, PieceComponent, GameComponent };
