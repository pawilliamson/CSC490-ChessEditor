/**
 * This class contains the code for the editor function.
 *
 */
export class Editor {
  chessboard: Board = new Board();

  /**
   * This method adds a Piece to a X and Y location, using the add method from the board class.
   *
   * @param toBeAdded
   * @param xPos
   * @param yPos
   */
  add(toBeAdded: Piece, xPos: number, yPos: number) {
    this.chessboard.add(xPos, yPos, toBeAdded);
  }

  /**
   * This method removes a Piece from a X and Y location, using the remove method from the board class.
   *
   * @param xPos
   * @param yPos
   */
  remove(xPos: number, yPos: number) {
    this.chessboard.remove(xPos, yPos);
  }
}
