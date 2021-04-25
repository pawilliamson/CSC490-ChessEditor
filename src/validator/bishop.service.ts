// File: bishop.service.ts
import { Piece } from './piece.service';

/**
 * Class: Bishop
 * Extends Piece
 *
 * This class is for the Bishop chess piece.
 *
 */
export class Bishop extends Piece {
  /**
   * Function: getName
   * This method returns the name of the Piece.
   *
   */
  getName() {
    return 'BISHOP';
  }
}
