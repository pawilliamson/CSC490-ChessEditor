// File: board.service.ts
// Contains Board Class
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
 * This class has a 2D array that will contain the chess pieces as well as methods to move them around, remove them, and add them.
 * 
 */
export class Board {
    BOARD_LIMIT: number = 7;
    chessBoard: Piece[][] = new Array;
    empty: Piece = new Piece("UNSPECIFIED");
	constructor(){
	let x = 0;
	for(;x <= 8; x++){
	 let y = 0;
	 let row:Piece[] = new Array;
	 for(;y <= 8; y++){
	  row[y] = new Piece("UNSPECIFIED");
	 }
	 this.chessBoard[x] = row;
	}
	}
    /**
     * This method will print the board out to the console. An empty space will be represented by --, and a filled space will be represented by a letter indicating the color of the Piece followed by a letter indicating the type of the Piece. This method should be used for
     * testing purposes only.
     * 
     */
    printBoard() {
        var xPos: number;
        var yPos: number;
        for(yPos = 0; yPos < this.BOARD_LIMIT; yPos++) {
            for(xPos = 0; xPos < this.BOARD_LIMIT; xPos++) {
                var pieceColor: String = this.chessBoard[xPos][yPos].getColor();
                var pieceName: String = this.chessBoard[xPos][yPos].getName();
                // These if-else statements will print out the color of the Piece.
                if(pieceColor == "WHITE") {
                    console.log("W");
                }
                else if(pieceColor == "BLACK") {
                    console.log("B");
                }
                else {
                    console.log("-");
                }
                // These if-else statements will print out the class of Piece.
                if(pieceName == "PAWN") {
                    console.log("P");
                }
                else if(pieceName == "KING") {
                    console.log("K");
                }
                else if(pieceName == "QUEEN") {
                    console.log("Q");
                }
                else if(pieceName == "ROOK") {
                    console.log("R");
                }
                else if(pieceName == "KNIGHT") {
                    console.log("H");
                }
                else if(pieceName == "BISHOP") {
                    console.log("B");
                }
                else {
                    console.log("-");
                }
                // This should begin a new line.
                console.log("\n");
            }
        }
    }

    /**
     * This method will remove a Piece at a specified X and Y location on the chess board.
     * 
     * @param xPos 
     * @param yPos 
     */
    remove(xPos: number, yPos: number) {
        if(xPos <= this.BOARD_LIMIT && yPos <= this.BOARD_LIMIT) {
            this.chessBoard[xPos][yPos] == this.empty;
        }
        else {
            console.log("Board class tried to remove a Piece out of bounds. Please ensure the location is within bounds. Attempted X Position: " + xPos + "Attempted Y Position: " + yPos);
        }
    }

    /**
     * This method will add a specified piece to a specified X and Y location. Will be used to populate the board, when a pawn becomes a queen, and in the editor.
     * 
     * @param xPos 
     * @param yPos 
     * @param addedPiece 
     */
    add(xPos: number, yPos: number, addedPiece: Piece) {
        if(xPos <= this.BOARD_LIMIT && yPos <= this.BOARD_LIMIT) {
            this.chessBoard[xPos][yPos] = addedPiece;
        }
        else {
            console.log("Board class tried to add a Piece out of bounds. Attempted X Position " + xPos + " Attempted Y Position: " + yPos);
        }
    }

    /**
     * This method will move a piece at a specified X and Y location to different specified X and Y coordinates.
     * 
     * @param initialXPos 
     * @param initialYPos 
     * @param locationXPos 
     * @param locationYPos 
     */
    move(initialXPos: number, initialYPos: number, locationXPos: number, locationYPos: number) {
        if(initialXPos <= this.BOARD_LIMIT && initialYPos <= this.BOARD_LIMIT && locationXPos <= this.BOARD_LIMIT && locationYPos <= this.BOARD_LIMIT) {
            this.chessBoard[locationXPos][locationYPos] = this.chessBoard[initialXPos][initialYPos];
            this.remove(initialXPos, initialYPos);
        }
        else{
            console.log("Board class tried to move a Piece out of bounds, or the location of the Piece to be moved was out of bounds. Attempted beggining X Position: " + initialXPos + " Attempted beggining Y Position: " + initialYPos + " Attempted destination X Position: " + locationXPos + "Attempted destination Y Position: " + locationYPos)
        }
    }

    /**
     * This method will return which Piece is at a specified X and Y location.
     * 
     * @param xPos 
     * @param yPos 
     */
    getPiece(xPos: number, yPos: number) {
        if(xPos <= this.BOARD_LIMIT && yPos <= this.BOARD_LIMIT) {
            return this.chessBoard[xPos][yPos];
        }
        else {
            console.log("Board class tried to return a Piece that was out of bounds. Attempted X Position: " + xPos + " Attempted Y Position: " + yPos);
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
