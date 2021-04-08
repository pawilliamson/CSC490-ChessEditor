/**
 * This class will test ValidatorBoard class. It will test the capabilities of movement of each piece in a variety of ways.
 * 
 */
export class TestBoard {
    testBoard: ValidatorBoard = new ValidatorBoard();

    /**
     * This will test the directions the black pawn can move. All the directions other than the one that it can move, down, are tested. 
     * Expected: False
     * 
     * @returns
     */
    testPawnMovement1() {
        this.testBoard = new ValidatorBoard();
        var blackPawn = new Pawn("BLACK");
        this.testBoard.chessBoard[3][3] = blackPawn;
        return this.testBoard.validateMovement(3, 3, 3, 4) || this.testBoard.validateMovement(3, 3, 4, 4) || this.testBoard.validateMovement(3, 3, 4, 3) || this.testBoard.validateMovement(3, 3, 4, 2) || this.testBoard.validateMovement(3, 3, 3, 2) 
        || this.testBoard.validateMovement(3, 3, 2, 2) || this.testBoard.validateMovement(3, 3, 2, 3), this.testBoard.validateMovement(3, 3, 2, 4);
    }

    /**
     * This will test the directions the black pawn can move. The only one tested is the one it should be able to move, down.
     * Expected: True
     * 
     * @returns
     */
    testPawnMovement2() {
        this.testBoard = new ValidatorBoard();
        var blackPawn = new Pawn("BLACK");
        this.testBoard.chessBoard[3][3] = blackPawn;
        return this.testBoard.validateMovement(3, 3, 3, 2);
    }

    /**
     * This will test that a black pawn can move onto a space with an enemy piece.
     * Expected: True
     * 
     * @returns
     */
    testPawnMovement3() {
        this.testBoard = new ValidatorBoard();
        var test1: boolean = false;
        var test2: boolean = false;
        var blackPawn = new Pawn("BLACK");
        var whitePawn = new Pawn("WHITE");
        this.testBoard.chessBoard[3][3] = blackPawn;
        this.testBoard.chessBoard[2][2] = whitePawn;
        this.testBoard.chessBoard[4][2] = whitePawn;
        test1 = this.testBoard.validateMovement(3, 3, 2, 2)
        this.testBoard.chessBoard[3][3] = this.testBoard.chessBoard[2][2];
        test2 = this.testBoard.validateMovement(3, 3, 4, 2);
        return test1 && test2;
    }

    /**
     * This will test that a black pawn can not move onto a space with the same color of piece.
     * Expected: False
     * 
     * @returns
     */
    testPawnMovement4() {
        this.testBoard = new ValidatorBoard();
        var test1: boolean = false;
        var test2: boolean = false;
        var blackPawn = new Pawn("BLACK");
        this.testBoard.chessBoard[3][3] = blackPawn;
        this.testBoard.chessBoard[2][2] = blackPawn;
        this.testBoard.chessBoard[4][2] = blackPawn;
        test1 = this.testBoard.validateMovement(3, 3, 2, 2);
        test2 = this.testBoard.validateMovement(3, 3, 4, 2);
        return test1 || test2;
    }

    /**
     * This will test the directions the white pawn can move. All the directions other than the one that it can move, down, are tested. 
     * Expected: False
     * 
     * @returns
     */
     testPawnMovement5() {
        this.testBoard = new ValidatorBoard();
        var whitePawn = new Pawn("WHITE");
        this.testBoard.chessBoard[3][3] = whitePawn;
        return this.testBoard.validateMovement(3, 3, 3, 2) || this.testBoard.validateMovement(3, 3, 4, 4) || this.testBoard.validateMovement(3, 3, 4, 3) || this.testBoard.validateMovement(3, 3, 4, 2) || this.testBoard.validateMovement(3, 3, 3, 2) 
        || this.testBoard.validateMovement(3, 3, 2, 2) || this.testBoard.validateMovement(3, 3, 2, 3), this.testBoard.validateMovement(3, 3, 2, 4);
    }

    /**
     * This will test the directions the white pawn can move. The only one tested is the one it should be able to move, down.
     * Expected: True
     * 
     * @returns
     */
    testPawnMovement6() {
        this.testBoard = new ValidatorBoard();
        var whitePawn = new Pawn("WHITE");
        this.testBoard.chessBoard[3][3] = whitePawn;
        return this.testBoard.validateMovement(3, 3, 3, 4);
    }

    /**
     * This will test that a white pawn can move onto a space with an enemy piece.
     * Expected: True
     * 
     * @returns
     */
    testPawnMovement7() {
        this.testBoard = new ValidatorBoard();
        var test1: boolean = false;
        var test2: boolean = false;
        var blackPawn = new Pawn("BLACK");
        var whitePawn = new Pawn("WHITE");
        this.testBoard.chessBoard[3][3] = whitePawn;
        this.testBoard.chessBoard[2][4] = blackPawn;
        this.testBoard.chessBoard[4][4] = blackPawn;
        test1 = this.testBoard.validateMovement(3, 3, 2, 4)
        this.testBoard.chessBoard[3][3] = this.testBoard.chessBoard[2][4];
        test2 = this.testBoard.validateMovement(3, 3, 4, 4);
        return test1 && test2;
    }

    /**
     * This will test the directions that any rook can move. It will only test directly horizontal and vertical movements.
     * Expected: True
     * 
     * @returns
     */
    testRookMovement1() {
        this.testBoard = new ValidatorBoard();
        var blackRook = new Rook("BLACK");
        this.testBoard.chessBoard[3][3] = blackRook;
        return this.testBoard.validateMovement(3, 3, 4, 3) && this.testBoard.validateMovement(4, 3, 7, 3) && this.testBoard.validateMovement(7, 3, 4, 3) && this.testBoard.validateMovement(4, 3, 3, 3) && this.testBoard.validateMovement(3, 3, 3, 2)
        && this.testBoard.validateMovement(3, 3, 3, 0) && this.testBoard.validateMovement(3, 0, 3, 2) && this.testBoard.validateMovement(3, 2, 3, 3) && this.testBoard.validateMovement(3, 3, 2, 3) && this.testBoard.validateMovement(2, 3, 0, 3)
        && this.testBoard.validateMovement(0, 3, 2, 3) && this.testBoard.validateMovement(2, 3, 3, 3) && this.testBoard.validateMovement(3, 3, 3, 4) && this.testBoard.validateMovement(3, 4, 3, 7);
    }

    /**
     * This will test a rook trying to move in directions that aren't directly horizontal or vertical.
     * Expected: False
     * 
     * @returns
     */
    testRookMovement2() {
        this.testBoard = new ValidatorBoard();
        var blackRook = new Rook("BLACK");
        this.testBoard.chessBoard[3][3] = blackRook;
        return this.testBoard.validateMovement(3, 3, 2, 4) || this.testBoard.validateMovement(3, 3, 2, 5);
    }

    /**
     * This will test a rook trying to move to a space that it would normally be able to move to, but is blocked by another piece, one of the same color, one of another color.
     * Expected: False
     * 
     * @returns
     */
    testRookMovement3() {
        this.testBoard = new ValidatorBoard();
        var blackRook = new Rook("BLACK");
        var whiteRook = new Rook ("WHITE");
        this.testBoard.chessBoard[3][3] = blackRook;
        this.testBoard.chessBoard[2][3] = blackRook;
        this.testBoard.chessBoard[3][5] = whiteRook;
        return this.testBoard.validateMovement(3, 3, 1, 3) || this.testBoard.validateMovement(3, 3, 3, 6);
    }

    /**
     * This will test a rook trying to move to a space that is occupied by another piece, one enemy piece and one friendly piece.
     * Expected: True
     * 
     * @returns
     */
    testRookMovement4() {
        this.testBoard = new ValidatorBoard();
        var blackRook = new Rook("BLACK");
        var whiteRook = new Rook("WHITE");
        this.testBoard.chessBoard[3][3] = blackRook;
        this.testBoard.chessBoard[2][3] = blackRook;
        this.testBoard.chessBoard[3][5] = whiteRook;
        return !this.testBoard.validateMovement(3, 3, 2, 3) && this.testBoard.validateMovement(3, 3, 3, 5);
    }

    /**
     * This will test the directions a bishop can move. It will only test directly diagonal movements.
     * Expected: True
     * 
     * @returns
     */
    testBishopMovement1() {
        this.testBoard = new ValidatorBoard();
        var blackBishop = new Bishop("BLACK");
        this.testBoard.chessBoard[3][3] = blackBishop;
        return this.testBoard.validateMovement(3, 3, 4, 4) && this.testBoard.validateMovement(4, 4, 6, 6) && this.testBoard.validateMovement(6, 6, 4, 4) && this.testBoard.validateMovement(4, 4, 3, 3) && this.testBoard.validateMovement(3, 3, 2, 4)
        && this.testBoard.validateMovement(2, 4, 0, 6) && this.testBoard.validateMovement(0, 6, 2, 4) && this.testBoard.validateMovement(2, 4, 3, 3);
    }

    /**
     * This will test the directions a bishop can't move, including horizontal and vertical and movements that are not directly diagonal.
     * Expected: False
     * 
     * @returns
     */
    testBishopMovement2() {
        this.testBoard = new ValidatorBoard();
        var blackBishop = new Bishop("BLACK");
        this.testBoard.chessBoard[3][3] = blackBishop;
        return this.testBoard.validateMovement(3, 3, 2, 3) || this.testBoard.validateMovement(3, 3, 2, 5) || this.testBoard.validateMovement(3, 3, 3, 4) || this.testBoard.validateMovement(3, 3, 4, 0);
    }

    /**
     * This will test if the bishop can move if it's path is blocked by either a piece of it's own color or the opponent's piece.
     * Expected: False
     * 
     * @returns 
     */
    testBishopMovement3() {
        this.testBoard = new ValidatorBoard();
        var blackBishop = new Bishop("BLACK");
        var whiteBishop = new Bishop("WHITE");
        this.testBoard.chessBoard[3][3] = blackBishop;
        this.testBoard.chessBoard[1][5] = whiteBishop;
        this.testBoard.chessBoard[4][2] = blackBishop;
        return this.testBoard.validateMovement(3, 3, 0, 6) || this.testBoard.validateMovement(3, 3, 5, 1);
    }

    /**
     * This will test if the bishop can move to a space occupied by an enemy piece.
     * Expected: True
     * 
     * @returns 
     */
    testBishopMovement4() {
        this.testBoard = new ValidatorBoard();
        var blackBishop = new Bishop("BLACK");
        var whiteBishop = new Bishop("WHITE");
        this.testBoard.chessBoard[3][3] = blackBishop;
        this.testBoard.chessBoard[2][4] = whiteBishop;
        this.testBoard.chessBoard[0][6] = whiteBishop;
        return this.testBoard.validateMovement(3, 3, 2, 4) && this.testBoard.validateMovement(2, 4, 0, 6);
    }

    /**
     * This will test the directions the knight can move.
     * Expected: True
     * 
     * @returns
     */
    testKnightMovement1() {
        this.testBoard = new ValidatorBoard();
        var blackKnight = new Knight("BLACK");
        this.testBoard.chessBoard[3][3] = blackKnight;
        return this.testBoard.validateMovement(3, 3, 1, 2) && this.testBoard.validateMovement(1, 2, 3, 3) && this.testBoard.validateMovement(3, 3, 1, 4) && this.testBoard.validateMovement(1, 4, 3, 3) && this.testBoard.validateMovement(3, 3, 2, 5) 
        && this.testBoard.validateMovement(2, 5, 3, 3) && this.testBoard.validateMovement(3, 3, 4, 5) && this.testBoard.validateMovement(4, 5, 3, 3); 
    }

    /**
     * This will test the directions the knight can't move.
     * Expected: False
     * 
     * @returns
     */
    testKnightMovement2() {
        this.testBoard = new ValidatorBoard();
        var blackKnight = new Knight("BLACK");
        this.testBoard.chessBoard[3][3] = blackKnight;
        return this.testBoard.validateMovement(3, 3, 2, 3) || this.testBoard.validateMovement(3, 3, 2, 4) || this.testBoard.validateMovement(3, 3, 3, 4) || this.testBoard.validateMovement(3, 3, 4, 4) || this.testBoard.validateMovement(3, 3, 4, 3)
        || this.testBoard.validateMovement(3, 3, 4, 2) || this.testBoard.validateMovement(3, 3, 3, 2) || this.testBoard.validateMovement(3, 3, 2, 2);
    }

    /**
     * This will test that the knight can move to a space that's occupied by an enemy, but not to a space occupied by a piece of the same color.
     * Expected: True
     * 
     * @returns
     */
    testKnightMovement3() {
        this.testBoard = new ValidatorBoard();
        var blackKnight = new Knight("BLACK");
        var whiteKnight = new Knight("WHITE");
        this.testBoard.chessBoard[3][3] = blackKnight;
        this.testBoard.chessBoard[1][2] = whiteKnight;
        this.testBoard.chessBoard[2][5] = blackKnight;
        return !this.testBoard.validateMovement(3, 3, 2, 5) && this.testBoard.validateMovement(3, 3, 1, 2);
    }

    /**
     * This will test the directions that the queen can move.
     * Expected: True
     * 
     * @returns
     */
    testQueenMovement1() {
        this.testBoard = new ValidatorBoard();
        var blackQueen = new Queen("BLACK");
        this.testBoard.chessBoard[3][3] = blackQueen;
        return this.testBoard.validateMovement(3, 3, 2, 3) && this.testBoard.validateMovement(2, 3, 0, 3) && this.testBoard.validateMovement(0, 3, 2, 3) && this.testBoard.validateMovement(2, 3, 3, 3) && this.testBoard.validateMovement(3, 3, 2, 4)
        && this.testBoard.validateMovement(2, 4, 0, 6) && this.testBoard.validateMovement(0, 6, 2, 4) && this.testBoard.validateMovement(2, 4, 3, 3) && this.testBoard.validateMovement(3, 3, 3, 4) && this.testBoard.validateMovement(3, 4, 3, 6) &&
        this.testBoard.validateMovement(3, 6, 3, 4) && this.testBoard.validateMovement(3, 4, 3, 3);
    }

    /**
     * This will test the directions that the queen can not move.
     * Expected: False
     * 
     * @returns
     */
    testQueenMovement2() {
        this.testBoard = new ValidatorBoard();
        var blackQueen = new Queen("BLACK");
        this.testBoard.chessBoard[3][3] = blackQueen;
        return this.testBoard.validateMovement(3, 3, 4, 5) || this.testBoard.validateMovement(3, 3, 5, 2) || this.testBoard.validateMovement(3, 3, 2, 1);
    }

    /**
     * Tests if a queen can move if it's path is blocked by a piece.
     * Expected: False
     * 
     * @returns
     */
    testQueenMovement3() {
        this.testBoard = new ValidatorBoard();
        var blackQueen = new Queen("BLACK");
        var whiteQueen = new Queen("WHITE");
        this.testBoard.chessBoard[3][3] = blackQueen;
        this.testBoard.chessBoard[2][3] = whiteQueen;
        this.testBoard.chessBoard[5][3] = blackQueen;
        return this.testBoard.validateMovement(3, 3, 0, 3) || this.testBoard.validateMovement(3, 3, 6, 3);
    }

    /**
     * Tests if a queen can move onto a space occupied by an enemy piece, but not one occupied by a piece of the same color.
     * Expected: True
     * 
     * @returns
     */
    testQueenMovement4() {
        this.testBoard = new ValidatorBoard();
        var blackQueen = new Queen("BLACK");
        var whiteQueen = new Queen("WHITE");
        this.testBoard.chessBoard[3][3] = blackQueen;
        this.testBoard.chessBoard[0][3] = whiteQueen;
        this.testBoard.chessBoard[5][3] = blackQueen;
        return !this.testBoard.validateMovement(3, 3, 5, 3) && this.testBoard.validateMovement(3, 3, 0, 3);
    }

    /**
     * Tests if a king can move in all of the directions it should be able.
     * Expected: True
     * 
     * @returns
     */
    testKingMovement1() {
        this.testBoard = new ValidatorBoard();
        var blackKing = new King("BLACK");
        this.testBoard.chessBoard[3][3] = blackKing;
        return this.testBoard.validateMovement(3, 3, 2, 3) && this.testBoard.validateMovement(2, 3, 3, 3) && this.testBoard.validateMovement(3, 3, 2, 4) && this.testBoard.validateMovement(2, 4, 3, 3) && this.testBoard.validateMovement(3, 3, 3, 4)
        && this.testBoard.validateMovement(3, 4, 3, 3) && this.testBoard.validateMovement(3, 3, 4, 4) && this.testBoard.validateMovement(4, 4, 3, 3);
    }

    /**
     * Tests if a king can move in directions that it shouldn't be able.
     * Expected: False
     * 
     * @returns
     */
    testKingMovement2() {
        this.testBoard = new ValidatorBoard();
        var blackKing = new King("BLACK");
        this.testBoard.chessBoard[3][3] = blackKing;
        return this.testBoard.validateMovement(3, 3, 1, 3) || this.testBoard.validateMovement(3, 3, 3, 5) || this.testBoard.validateMovement(3, 3, 1, 5);
    }

    /**
     * Tests if a king can move onto a space occupied by an enemy piece, but not one occupied by a piece of the same color.
     * Expected: True
     * 
     * @returns
     */
    testKingMovement3() {
        this.testBoard = new ValidatorBoard();
        var blackKing = new King("BLACK");
        var whiteKing = new King("WHITE");
        this.testBoard.chessBoard[3][3] = blackKing;
        this.testBoard.chessBoard[4][4] = whiteKing;
        this.testBoard.chessBoard[4][3] = blackKing;
        return this.testBoard.validateMovement(3, 3, 4, 3) && !this.testBoard.validateMovement(3, 3, 4, 4);
    }
}
