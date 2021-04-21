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
import { PieceProvider} from './piece.service.provider';

@NgModule({
  imports: [
    CommonModule
  ],
})
export class ValidatorModule { }
export {ValidatorBoard, Rook, King, Queen, Pawn, PieceProvider, Bishop, Knight, Board, Piece};
