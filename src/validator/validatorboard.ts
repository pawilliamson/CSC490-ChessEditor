// File: validatorboard.ts
// Originally designed by Brandon in JS
// Converted to TypeScript by Tylor
// Implemented in Angular by Devin
import { Board } from './board.service';
import { Rook } from './rook.service';
import { Pawn } from './pawn.service';
import { King } from './king.service';
import { Queen } from './queen.service';
import { Piece } from './piece.service';
import { Bishop } from './bishop.service';
import { Knight } from './knight.service';

/**
 * Class: ValidatorBoard
 * This class is an extension of the Board that will be used in the Game class.
 * The difference is that this class contains methods to determine what moves a chess piece can make.
 * Throughout this class x1, y1, x2, and y2 will be used as parameters.
 *
 * x1 and y1 refer to the x and y coordinates of the initial space the
 * piece is at, and x2 and y2 refer to the destination of the piece.
 *
 */
export class ValidatorBoard extends Board {

	// These two Queens will be exchanged
	// with the Pawn when the Pawn reaches
	// the end of the board.

	blackQueen: Queen = new Queen('BLACK');
	whiteQueen: Queen = new Queen('WHITE');


	// These two booleans will be used to determine castling,
	// as one can only castle as their king's first move.
	// This will be set to true whenever the king moves.

	blackKingMoved = false;
	whiteKingMoved = false;

	/**
	 * This method will check the top and bottom rows of the chess board,
	 * and if it contains any white pawns in the top row, or black pawns
	 * in the bottom row, it converts them to queens.
	 *
	 * This should be run at the end of every turn.
	 *
	 */
	checkPawns() {
		// Every position on the board where y=0 or y=7 will be checked.
		let xPos = 0;
		// Checking where y=0, the bottom of the board.
		for (xPos = 0; xPos < 8; xPos++) {
			if (this.chessBoard[0][xPos].getName() === 'PAWN'
				&& this.chessBoard[xPos][0].getColor() === 'BLACK') {
				console.log('Changing black pawn at ' + xPos + ' 0 to a black queen.');
				this.chessBoard[xPos][0] = this.blackQueen;
			}
		}
		// Checking where y=7, the top of the board.
		for (xPos = 0; xPos < 8; xPos++) {
			if (this.chessBoard[7][xPos].getName() === 'PAWN'
				&& this.chessBoard[xPos][7].getColor() === 'WHITE') {
				console.log('Changing white pawn at ' + xPos + ' 7 to a white queen.');
				this.chessBoard[xPos][7] = this.whiteQueen;
			}
		}
	}

	/**
	 *  Function: validCoordinatesChecker
	 *
	 *  This is a helper method to ensure that the coordinates
	 *  being input are valid and not out of bounds.
	 *
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 */
	validCoordinatesChecker(x1: number, y1: number, x2: number, y2: number) {
		console.log('CHECKER');
		console.log(x1);
		console.log(x2);
		console.log(y1);
		console.log(y2);
		if (x1 > this.boardLimit
			|| y1 > this.boardLimit
			|| x2 > this.boardLimit
			|| y2 > this.boardLimit || x1 < 0 || y1 < 0 || x2 < 0 || y2 < 0) {
			console.log('Input out of bounds was sent!');
			return false;
		}
		return true;
	}

	/**
	 *  Function: goodDiagonalPathChecker
	 *
	 *
	 * This is a helper method to ensure that if a piece is being moved
	 * diagonally, it is at the correct 1:1 ratio for x and y movement, and
	 * is not being obstructed by anything.
	 *
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 */
	goodDiagonalPathChecker(x1: number, y1: number, x2: number, y2: number) {
		console.log('(' + x1 + ', ' + y1 + ') to (' + x2 + ', ' + y2 + ')');
		// xChange and yChange will be used to determine if the
		// diagonal path is correct, if it is the absolute value of x1
		// - x2 will equal the absolute value of y1 - y2.
		const xChange: number = x2 - x1;
		const yChange: number = y2 - y1;

		// xChangePerSpace and yChangePerSpace will be used in the for
		// loop to determine if there are any obstructions, they will
		// either be -1 or +1 depending on the direction
		// and that is what the loop variable will be incremented by.
		const xChangePerSpace: number = 1 / xChange;

		const yChangePerSpace: number = 1 / yChange;
		if (xChange === -yChange || -xChange === yChange || xChange === yChange) {
			// The diagonal path will be searched, and if there is
			// a piece in the way, it will be an obstruction, and
			// false will be returned.
			let tempx: number = x1;
			let tempy: number = y1;
			for (tempx = tempx + (xChangePerSpace > 0?1:-1); tempx
				!== x2 ; tempx += (xChangePerSpace > 0?1:-1)) {
				tempy += yChangePerSpace > 0?1:-1;
				console.log(tempx);
				console.log(tempy);
				if
				(this.chessBoard[Math.floor(tempy)][Math.floor(tempx)].getName()
					!== 'UNSPECIFIED') {
					console.log('Obstruction along a diagonal path');
					return false;
				}
			}
			// If it passes the initial if condition and the for
			// loops, it is a diagonal path with no obstructions.
			return true;
		}
		console.log('Not diagonal path (' + x1 + ', ' + y1 + ') to (' + x2 + ', ' + y2 + ')');
		console.log('xChange: ' + xChange);
		console.log('yChange: ' + yChange);
		return false;
	}

	/**
	 * Function: goodHorizontalVerticalPathChecker
	 *
	 * Parameters:
	 *
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 *
	 *
	 * Description: This is a helper method to ensure that a piece is
	 * being moved horizontally or vertically with no obstructions.
	 *
	 */
	goodHorizontalVerticalPathChecker(x1: number, y1: number, x2: number, y2: number) {

		// xChange and yChange will be used to determine
		// that the path is either horizontal or vertical,
		// a diagonal path would have one of them be not equal to zero.

		const xChange: number = x2 - x1;
		const yChange: number = y2 - y1;

		// xChangePerSpace and yChangePerSpace will be used in the for loop to determine
		// if there are any obstructions, they will either be -1 or +1 depending on the
		// direction and that is what the loop variable will be incremented by.
		const xChangePerSpace: number = 1 / xChange;
		const yChangePerSpace: number = 1 / yChange;


		// Either the change in x or the change in y must be zero for it to not be a diagonal path.
		if (xChange === 0 || yChange === 0) {

			// The horizontal or vertical path will be searched, and if there is a piece in the way,
			// it will be an obstruction, and false will be returned.
			const tempx = x1;
			const tempy = y1;
			if(yChange === 0)
			{
				for (let tem = tempx + (xChangePerSpace > 0?1:-1); tem !== x2; tem += xChangePerSpace >0?1:-1) {
				console.log(this.chessBoard[tempy][tem].getName());
				if (this.chessBoard[tempy][tem].getName() !== 'UNSPECIFIED') {
					console.log('Obstruction along horizontal path');
					return false;
				}
			}}
			if(xChange === 0)
			{
				for (let temy = tempy + (yChangePerSpace > 0?1:-1);
					temy !== y2; temy += (yChangePerSpace>0?1:-1)) {
				console.log(this.chessBoard[temy][tempx].getName());
				if (this.chessBoard[temy][tempx].getName() !== 'UNSPECIFIED') {
					console.log(this.chessBoard[temy][tempx].getName());
					console.log('Obstruction along vertical path');
					console.log('(' + x1 + ', ' + y1 + ') to (' + x2 + ', ' + y2 + ')');
					return false;
				}
			}}


			// If it passes the initial if conditions and the for loops,
			// it is a horizontal or vertical path with no obsturctions.
			return true;
		}
		console.log('INVALID');
		console.log('(' + x1 + ', ' + y1 + ') to (' + x2 + ', ' + y2 + ')');
		return false;
	}

	/**
	 *Function: checkCastling
	 * This will validate if a piece can castle or not.
	 *
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 */
	checkCastling(x1: number, y1: number, x2: number, y2: number) {

	}

	/**
	 *Function: validateMovement
	 * This method will validate the movement for a piece at coordinates x1, y1
	 * to move to x2, y2. It will return true if a move is completed successfully
	 * and false if otherwise.
	 *
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 * @returns
	 */
	validateMovement(x1: number, y1: number, x2: number, y2: number) {
		if (!this.validCoordinatesChecker(x1, y1, x2, y2)) {
			return false;
		}
		if (this.chessBoard[y1][x1].getName() === 'UNSPECIFIED') {
			console.log('Error: No piece selected');
			console.log(this.chessBoard);
		}
		const pieceName: string = this.chessBoard[y1][x1].getName();
		let validMovement = false;
		switch (pieceName) {
			case ('PAWN'):
				if (this.checkPawnMovement(x1, y1, x2, y2)) {
					validMovement = true;
				}
				break;
			case ('QUEEN'):
				if (this.checkQueenMovement(x1, y1, x2, y2)) {
					validMovement = true;
				}
				break;
			case ('KING'):
				if (this.checkKingMovement(x1, y1, x2, y2)) {
					validMovement = true;
					// These booleans will be set to true after the king's movement
					// to prevent them from castling after moving.
					if (this.chessBoard[y1][x1].getColor() === 'WHITE') {
						this.whiteKingMoved = true;
					}
					if (this.chessBoard[y1][x1].getColor() === 'BLACK') {
						this.blackKingMoved = true;
					}
				}
				break;
			case ('BISHOP'):
				if (this.checkBishopMovement(x1, y1, x2, y2)) {
					validMovement = true;
				}
				break;
			case ('ROOK'):
				if (this.checkRookMovement(x1, y1, x2, y2)) {
					validMovement = true;
				}
				break;
			case ('KNIGHT'):
				if (this.checkKnightMovement(x1, y1, x2, y2)) {
					validMovement = true;
				}
				break;
		}
		if (validMovement) {
			this.move(x1, y1, x2, y2);
			return true;
		}
		console.log('BUT WHY?');
		return false;
	}

	/**
	 *Function: checkPawnMovement
	 *
	 * This method will check that the pawn movement is correct
	 * and return true if it is. x1 and y1 are the coordinates of the pawn,
	 * and x2 and y2 are the coordinates of the space the pawn wants to move to.
	 *
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 */
	checkPawnMovement(x1: number, y1: number, x2: number, y2: number) {
		if (!this.validCoordinatesChecker(x1, y1, x2, y2)) {
			console.log('Invalid movement coordinates were sent for pawn');
			return false;
		}

		// TODO: I don't know if var is the right way to do this.
		const selectedPawn: Pawn = this.chessBoard[y1][x1];
		if (selectedPawn.getColor() === this.chessBoard[y2][x2].getColor()) {
			console.log('Pawn tried to move to location of another piece of its color.');
			return false;
		}

		// A black pawn will only be able to move down one, or down
		// diagonal if an enemy piece is occupying that space.
		console.log(selectedPawn.getColor());
		if (selectedPawn.getColor() === 'BLACK') {
			console.log('Maybe not?');
			// Checks for down movement, verifies that the piece is moving down one,
			// not moving horizontally, and there is nothing in the way of the piece.

			if (y2 === y1 + 1 && x1 === x2 &&
				this.chessBoard[y2][x2].getName() === 'UNSPECIFIED') {
				return true;
			}else{
			console.log('YOU LIAR!');
			}
			// Checks for down diagonal movement, which can occur
			// if there is an enemy piece occupying that space.
			// Checks that it is moving down 1, left or right 1,
			// that there is an enemy piece present at that space,
			// and that the color of the piece is white.
			if (y2 === y1 + 1 && (x2 === x1 + 1 || x2 === x1 - 1)
				&& this.chessBoard[y2][x2].getName() !== 'UNSPECIFIED' &&
				this.chessBoard[y2][x2].getColor() === 'WHITE')
			{
				return true;
			}
			console.log('Bad coordinates sent for movement of pawn.');
			return false;
		}
		if (selectedPawn.getColor() === 'WHITE') {
			// Checks for upward movement, verifies that the piece is moving
			// up one, not moving horizontally, and there is nothing in the
			// way of the piece.

			if (y2 === y1 - 1 && x1 === x2 &&
				this.chessBoard[y2][x2].getName() === 'UNSPECIFIED') {
				return true;
			}
			// Checks for upwards diagonal movement, which can occur if there
			// is an enemy piece occupying that space. Checks that it is
			// moving up 1, left or right 1,
			// that there is an enemy piece present at that space, and that
			// the color of the piece is black.

			if (y2 === y1 - 1 && (x2 === x1 + 1 || x2 === x1 - 1)
				&& this.chessBoard[y2][x2].getName() !== 'UNSPECIFIED' &&
				this.chessBoard[y2][x2].getColor() === 'BLACK')
			{

				return true;
			}
			console.log('Bad coordinates sent for movement of pawn.');
			return false;
		}
		// If neither of these if conditions are met, something has gone wrong
		// and a pawn without a color exists.

		console.log('Error: Pawn does not have a color');
		return false;
	}

	/**
	 * Function: checkKingMovement
	 * This method will check if a King's movement is correct and return true
	 * if it is valid, false if otherwise.
	 *
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 * @returns
	 */
	checkKingMovement(x1: number, y1: number, x2: number, y2: number) {
		if (!this.validCoordinatesChecker(x1, y1, x2, y2)) {
			console.log('Invalid movement coordinates were sent for king');
			return false;
		}
		// Checks to see if there is another piece of the same color occupying
		// the space the King is to move to.
		if (this.chessBoard[y2][x2].getColor() === this.chessBoard[y1][x1].getColor()) {
		console.log('YOU TYRANT!');
			return false;
		}
		const selectedKing: King = this.chessBoard[x1][y1];
		// The king can move one space in any direction, and there is no need
		// to check for their path being blocked by an enemy pawn as it will
		// remove an enemy pawn.
		if ((x2 === x1 + 1 || x2 === x1 - 1 || x2 === x1) && (y2 === y1 + 1 || y2 === y1 - 1 || y2 === y1)) {
			return true;
		}
		console.log('Bad coordinates sent for movment of king.');
		return false;
	}

	/**
	 * This method will check a Queen's movement and return true if it is
	 * valid, false if otherwise.
	 *
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 * @returns
	 */
	checkQueenMovement(x1: number, y1: number, x2: number, y2: number) {
		if (!this.validCoordinatesChecker(x1, y1, x2, y2)) {
			console.log('COORDINATE ERROR');
			return false;
		}
		if (this.chessBoard[y1][x1].getColor() === this.chessBoard[y2][x2].getColor()) {
		console.log('RED QUEEN');
			return false;
		}
		if (this.goodDiagonalPathChecker(x1, y1, x2, y2) || this.goodHorizontalVerticalPathChecker(x1, y1, x2, y2)) {
			return true;
		}
		console.log('BAD QUEEN');
		return false;
	}

	/**
	 * This method will check a Rook's movement and return true if it is
	 * valid, false if otherwise.
	 *
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 * @returns
	 */
	checkRookMovement(x1: number, y1: number, x2: number, y2: number) {
		if (!this.validCoordinatesChecker(x1, y1, x2, y2)) {
			console.log('COORDINATE ERROR');
			return false;
		}
		if ((this.chessBoard[y1][x1].getColor() === this.chessBoard[y2][x2].getColor())) {
			console.log('ATTEMPTING TO CAPTURE OWN PIECE');
			return false;
		}
		if (this.goodHorizontalVerticalPathChecker(x1, y1, x2, y2)) {
			return true;
		}
		console.log('X VS Y');
		return false;
	}

	/**
	 *Function: checkBishopMovement
	 * This method will check a Bishop's movement and return true if it is
	 * valid, false if otherwise.
	 *
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 * @returns f
	 */
	checkBishopMovement(x1: number, y1: number, x2: number, y2: number) {
		if (!this.validCoordinatesChecker(x1, y1, x2, y2)) {
			console.log('INVALID COORDS');
			return false;
		}
		if (this.chessBoard[y1][x1].getColor() === this.chessBoard[y2][x2].getColor()) {
			console.log('MUTINY!');
			return false;
		}
		// The bishop can move in any direction diagonally, the
		// goodDiagonalPathChecker method will ensure that the diagonal path
		// is correct and that there is no obstructions in its way.
		if (this.goodDiagonalPathChecker(x1, y1, x2, y2)) {
			return true;
		}
		console.log('BAD BISHOP');
		return false;
	}

	/**
	 *Function: checkKnightMovement
	 * This method will check a Knight's movement and return true if it is
	 * valid, false if otherwise.
	 *
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 * @returns
	 */
	checkKnightMovement(x1: number, y1: number, x2: number, y2: number) {
		if (!this.validCoordinatesChecker(x1, y1, x2, y2)) {
			console.log('INVALID COORD');
			return false;
		}
		if (this.chessBoard[y1][x1].getColor() === this.chessBoard[y2][x2].getColor()) {
			console.log('ATTEMPTING TO CAPTURE OWN PIECE');
			return false;
		}
		// The Knight must move in an L shape, horizontally by 1 or 2 spaces
		// and vertically by 2 or 1 spaces, respectively. Taking the absolute
		// value and performing 2 if statements

		// accounts for all variants of this instead of having to do 8 if statements.
		const xDiff = Math.abs(x2 - x1);
		const yDiff = Math.abs(y2 - y1);
		if ((xDiff === 2 && yDiff === 1) || (xDiff === 1 && yDiff === 2)) {
			return true;
		}
		console.log('Bad Knight');
		return false;
	}

	createPiece(fen: string){
		switch(fen){
		case 'p':
			return new Pawn('BLACK');
		case 'P':
			return new Pawn('WHITE');
			case 'r':
			return new Rook('BLACK');
			case 'R':
			return new Rook('WHITE');
			case 'n':
			return new Knight('BLACK');
			case 'N':
			return new Knight('WHITE');
			case 'b':
			return new Bishop('BLACK');
			case 'B':
			return new Bishop('WHITE');
			case 'q':
			return new Queen('BLACK');
			case 'Q':
			return new Queen('WHITE');
			case 'k':
			return new King('BLACK');
			case 'K':
			return new King('WHITE');
			default:
			return '';

		}
	}
}
