import { Piece } from "./piece.service";

/**
 * This class is for the Pawn chess piece.
 *
 */
export class Pawn extends Piece {
  /**
   * This method returns the name of the Piece.
   *
   */
  getName() {
    return "PAWN";
  }
}
