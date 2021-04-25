import {Piece} from './piece.service';

/**
 * This class represents the Queen chess piece.
 *
 */
export class Queen extends Piece {

    /**
     * This method returns the name of the Piece.
     *
     */
    getName() {
        return 'QUEEN';
    }
}
