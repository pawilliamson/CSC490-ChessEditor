// File: board.service.ts
// Contains Board Class
//
import { Rook } from './rook.service';
import { Pawn } from './pawn.service';
import { King } from './king.service';
import { Queen } from './queen.service';
import { Piece } from './piece.service';
import { Bishop } from './bishop.service';
import { Knight } from './knight.service';
import { ValidatorBoard } from './validatorboard';

/**
 *Class:Board
 * This class has a 2D array that will contain the chess pieces as well as
 * methods to move them around, remove them, and add them.
 *
 */
export class Board {
  boardLimit = 7;
  chessBoard: Piece[][] = new Array();
  empty: Piece = new Piece('UNSPECIFIED');
  constructor() {
    let x = 0;
    for (; x <= 7; x++) {
      let y = 0;
      const row: Piece[] = new Array();
      for (; y <= 7; y++) {
        row[y] = new Piece('UNSPECIFIED');
      }
      this.chessBoard[x] = row;
    }
  }

  /**
   * This method will remove a Piece at a specified X and Y location on the chess board.
   *
   * @param xPos
   * @param yPos
   */
  remove(xPos: number, yPos: number) {
    if (xPos <= this.boardLimit && yPos <= this.boardLimit) {
      this.chessBoard[yPos][xPos] = this.empty;
    }
  }

  /**
   * This method will add a specified piece to a specified X and Y location.
   * Will be used to populate the board, when a pawn becomes a queen, and in
   * the editor.
   *
   * @param xPos
   * @param yPos
   * @param addedPiece
   */
  add(xPos: number, yPos: number, addedPiece: Piece) {
    if (xPos <= this.boardLimit && yPos <= this.boardLimit) {
      this.chessBoard[yPos][xPos] = addedPiece;
    }
  }

  /**
   * This method will move a piece at a specified X and Y location to
   * different specified X and Y coordinates.
   *
   * @param initialXPos
   * @param initialYPos
   * @param locationXPos
   * @param locationYPos
   */
  move(
    initialXPos: number,
    initialYPos: number,
    locationXPos: number,
    locationYPos: number
  ) {
    if (
      initialXPos <= this.boardLimit &&
      initialYPos <= this.boardLimit &&
      locationXPos <= this.boardLimit &&
      locationYPos <= this.boardLimit
    ) {
      this.chessBoard[locationYPos][locationXPos] = this.chessBoard[
        initialYPos
      ][initialXPos];
      this.remove(initialXPos, initialYPos);
    }
  }

  /**
   * This method will return which Piece is at a specified X and Y location.
   *
   * @param xPos
   * @param yPos
   */
  getPiece(xPos: number, yPos: number) {
    if (xPos <= this.boardLimit && yPos <= this.boardLimit) {
      return this.chessBoard[yPos][xPos];
    }
    return null;
  }

  /**
   * This method will return the whole chessBoard array.
   *
   */
  getBoard() {
    return this.chessBoard;
  }
}
