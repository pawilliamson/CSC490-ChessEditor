import { Piece } from './piece.service';

/**
 * This class is for the King chess piece.
 *
 */
export class King extends Piece {
  /**
   * This method returns the name of the Piece.
   *
   */
  getName() {
    return 'KING';
  }
}
