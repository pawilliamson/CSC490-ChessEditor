//File: knight.service.ts
//File: $f
import {Piece} from './piece.service';

/**
 * This class is for the Knight chess piece.
 *
 */
export class Knight extends Piece {

    /**
     * This method returns the name of the Piece.
     *
     */
    getName() {
        return 'KNIGHT';
    }
}
