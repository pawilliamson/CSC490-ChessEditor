import {Piece} from './piece.service';

/**
 * This class is for the Bishop chess piece.
 * 
 */
export class Bishop extends Piece {
    
    /**
     * This method returns the name of the Piece.
     * 
     */
    getName() {
        return "BISHOP";
    }
}
