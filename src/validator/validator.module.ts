import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Rook } from './rook.service';
import { Pawn } from './pawn.service';
import { King } from './king.service';
import { Queen } from './queen.service';
import { Piece } from './piece.service';
import { Bishop } from './bishop.service';
import { Knight } from './knight.service';
import { ValidatorBoard } from './validatorboard';
import { Board } from './board.service';
export {Piece, Pawn, Rook, ValidatorBoard, Knight, Bishop, King, Queen, Board};
@NgModule({
  declarations: [Piece, Pawn, King, Queen, Bishop, Knight],
  imports: [
    CommonModule
  ],
  exports: [
  Pawn, Rook, King, Queen, Piece, Bishop, Knight
  ]
})
export class ValidatorModule { }
