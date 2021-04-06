/**
 * This class is an extension of the Board that will be used in the Game class. The difference is that this class contains methods to determine what moves a chess piece can make. Throughout this class x1, y1, x2, and y2 will be used as parameters.
 * x1 and y1 refer to the x and y coordinates of the initial space the piece is at, and x2 and y2 refer to the destination of the piece.
 * 
 */
class ValidatorBoard extends Board {
    // These two Queens will be exchanged with the Pawn when the Pawn reaches the end of the board.
    blackQueen: Queen = new Queen("BLACK");
    whiteQueen: Queen = new Queen("WHITE");
    // These two booleans will be used to determine castling, as one can only castle as their king's first move. This will be set to true whenever the king moves.
    blackKingMoved: boolean = false;
    whiteKingMoved: boolean = false;
    /**
     * This method will check the top and bottom rows of the chess board, and if it contains any white pawns in the top row, or black pawns in the bottom row, it converts them to queens. This should be run at the end of every turn.
     * 
     */
    checkPawns() {
        // Every position on the board where y=0 or y=7 will be checked.
        var xPos = 0;
        // Checking where y=0, the bottom of the board.
        for(xPos = 0; xPos < 8; xPos++) {
            if(this.chessBoard[xPos][0].getName() == "PAWN" && this.chessBoard[xPos][0].getColor() == "BLACK") {
                console.log("Changing black pawn at " + xPos + " 0 to a black queen.");
                this.chessBoard[xPos][0] = this.blackQueen;
            }
        }
        // Checking where y=7, the top of the board.
        for(xPos = 0; xPos < 8; xPos++) {
            if(this.chessBoard[xPos][7].getName() == "PAWN" && this.chessBoard[xPos][7].getColor() == "WHITE") {
                console.log("Changing white pawn at " + xPos + " 7 to a white queen.");
                this.chessBoard[xPos][7] = this.whiteQueen;
            }
        }
    }

    /**
     * This is a helper method to ensure that the coordinates being input are valid and not out of bounds.
     * 
     * @param x1 
     * @param y1 
     * @param x2 
     * @param y2 
     */
    validCoordinatesChecker(x1: number, y1: number, x2: number, y2: number) {
        if(x1 > this.BOARD_LIMIT || y1 > this.BOARD_LIMIT || x2 > this.BOARD_LIMIT || y2 > this.BOARD_LIMIT || x1 < 0 || y1 < 0 || x2 < 0 || y2 < 0) {
            console.log("Input out of bounds was sent!");
            return false;
        }
        return true;
    }

    /**
     * This is a helper method to ensure that if a piece is being moved diagonally, it is at the correct 1:1 ratio for x and y movement, and is not being obstructed by anything.
     * 
     * @param x1 
     * @param y1 
     * @param x2 
     * @param y2 
     */
    goodDiagonalPathChecker(x1: number, y1: number, x2: number, y2: number) {
        // xChange and yChange will be used to determine if the diagonal path is correct, if it is the absolute value of x1 - x2 will equal the absolute value of y1 - y2.
        var xChange: number = x1 - x2;
        var yChange: number = y1 - y2;
        // xChangePerSpace and yChangePerSpace will be used in the for loop to determine if there are any obstructions, they will either be -1 or +1 depending on the direction and that is what the loop variable will be incremented by.
        var xChangePerSpace: number = xChange/xChange;
        var yChangePerSpace: number = yChange/yChange;
        // This checks to ensure that there is a 1:1 ratio on the diagonal path. The "or -xChange == yChange" condition is in case either the change in x or the change in y is negative.
        if(xChange == yChange || -xChange == yChange) {
            // The diagonal path will be searched, and if there is a piece in the way, it will be an obstruction, and false will be returned.
            for(x1; x1 != x2; x1+=xChangePerSpace) {
                y1 = y1+yChangePerSpace;
                if(this.chessBoard[x1][y1].getName() != "UNSPECIFIED") {
                    console.log("Obstruction along a diagonal path");
                    return false;
                }
            }
            // If it passes the initial if condition and the for loops, it is a diagonal path with no obstructions.
            return true;
        }
        console.log("No diagonal path");
        return false;
    }

    /**
     * This is a helper method to ensure that a piece is being moved horizontally or vertically with no obstructions.
     * 
     * @param x1 
     * @param y1 
     * @param x2 
     * @param y2 
     */
    goodHorizontalVerticalPathChecker(x1: number, y1: number, x2: number, y2: number) {
        // xChange and yChange will be used to determine that the path is either horizontal or vertical, a diagonal path would have one of them be not equal to zero.
        var xChange: number = x1-x2;
        var yChange: number = y1-y2;
        // xChangePerSpace and yChangePerSpace will be used in the for loop to determine if there are any obstructions, they will either be -1 or +1 depending on the direction and that is what the loop variable will be incremented by.
        var xChangePerSpace: number = xChange/xChange;
        var yChangePerSpace: number = yChange/yChange;
        // Either the change in x or the change in y must be zero for it to not be a diagonal path.
        if(xChange == 0 || yChange == 0) {
            // The horizontal or vertical path will be searched, and if there is a piece in the way, it will be an obstruction, and false will be returned.
            for(x1; x1 != x2; x1+=xChangePerSpace) {
                if(this.chessBoard[x1][y1].getName() != "UNSPECIFIED") {
                    console.log("Obstruction along a horizontal or vertical path");
                    return false;
                }
            }
            for(y1; y1 != y2; y1+=yChangePerSpace) {
                if(this.chessBoard[x1][y1].getName() != "UNSPECIFIED") {
                    return false;
                }
            }
            // If it passes the initial if conditions and the for loops, it is a horizontal or vertical path with no obsturctions.
            return true;
        }
        return false;
    }

    /**
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
     * This method will validate the movement for a piece at coordinates x1, y1 to move to x2, y2. It will return true if a move is completed successfully and false if otherwise.
     * 
     * @param x1 
     * @param y1 
     * @param x2 
     * @param y2 
     * @returns
     */
    validateMovement(x1: number, y1: number, x2: number, y2:number) {
        if(!this.validCoordinatesChecker(x1, y1, x2, y2)) {
            return false;
        }
        if(this.chessBoard[x1][y1].getName() == "UNSPECIFIED") {
            console.log("Error: No piece selected");
        }
        var pieceName: string = this.chessBoard[x1][y1].getName();
        var validMovement: boolean = false;
        switch(pieceName) {
            case("PAWN"): if(this.checkPawnMovement(x1, y1, x2, y2)) {
                validMovement = true;
            }
            case("QUEEN"): if(this.checkQueenMovement(x1, y1, x2, y2)) {
                validMovement = true;
            }
            case("KING"): if(this.checkKingMovement(x1, y1, x2, y2)) {
                validMovement = true;
                // These booleans will be set to true after the king's movement to prevent them from castling after moving.
                if(this.chessBoard[x1][y1].getColor() == "WHITE") {
                    this.whiteKingMoved = true;
                }
                if(this.chessBoard[x1][y1].getColor() == "BLACK") {
                    this.blackKingMoved = true;
                }
            }
            case("BISHOP"): if(this.checkBishopMovement(x1, y1, x2, y2)) {
                validMovement = true;
            }
            case("ROOK"): if(this.checkRookMovement(x1, y1, x2, y2)) {
                validMovement = true;
            }
            case("KNIGHT"): if(this.checkKnightMovement(x1, y1, x2, y2)) {
                validMovement = true;
            }
        }
        if(validMovement) {
            this.move(x1, y1, x2, y2);
            return true;
        }
        return false;
    }

    /**
     * This method will check that the pawn movement is correct and return true if it is. x1 and y1 are the coordinates of the pawn, and x2 and y2 are the coordinates of the space the pawn wants to move to.
     * 
     * @param x1 
     * @param y1 
     * @param x2 
     * @param y2 
     */
    checkPawnMovement(x1: number, y1: number, x2: number, y2: number) {
        if(!this.validCoordinatesChecker(x1, y1, x2, y2)) {
            console.log("Invalid movement coordinates were sent for pawn");
            return false;
        }
        // TODO: I don't know if var is the right way to do this.
        var selectedPawn: Pawn = this.chessBoard[x1][y1];
        if(selectedPawn.getColor() == this.chessBoard[x2][y2].getColor()) {
            console.log("Pawn tried to move to location of another piece of its color.");
            return false;
        }
        // A black pawn will only be able to move down one, or down diagonal if an enemy piece is occupying that space.
        if(selectedPawn.getColor() == "BLACK") {
            // Checks for down movement, verifies that the piece is moving down one, not moving horizontally, and there is nothing in the way of the piece.
            if(y2 == y1-1 && x1 == x2 && this.chessBoard[x2][y2].getName() == "UNSPECIFIED") {
                return true;
            }
            // Checks for down diagonal movement, which can occur if there is an enemy piece occupying that space. Checks that it is moving down 1, left or right 1, 
            // that there is an enemy piece present at that space, and that the color of the piece is white.
            if(y2 == y1-1 && (x2 == x1 + 1 || x2 == x1-1) && this.chessBoard[x2][y2].getName() != "UNSPECIFIED" &&  this.chessBoard[x2][y2].getColor() == "WHITE") {
                return true;
            }
            console.log("Bad coordinates sent for movement of pawn.");
            return false;
        }
        if(selectedPawn.getColor() == "WHITE") {
            // Checks for upward movement, verifies that the piece is moving up one, not moving horizontally, and there is nothing in the way of the piece.
            if(y2 == y1+1 && x1 == x2 && this.chessBoard[x2][y2].getName() == "UNSPECIFIED") {
                return true;
            }
            // Checks for upwards diagonal movement, which can occur if there is an enemy piece occupying that space. Checks that it is moving up 1, left or right 1, 
            // that there is an enemy piece present at that space, and that the color of the piece is black.
            if(y2 == y1+1 && (x2 == x1 + 1 || x2 == x1-1) && this.chessBoard[x2][y2].getName() != "UNSPECIFIED" &&  this.chessBoard[x2][y2].getColor() == "BLACK") {
                return true;
            }
            console.log("Bad coordinates sent for movement of pawn.");
            return false;
        }
        // If neither of these if conditions are met, something has gone wrong and a pawn without a color exists.
        console.log("Error: Pawn does not have a color");
        return false;
    }

    /**
     * This method will check if a King's movement is correct and return true if it is valid, false if otherwise.
     * 
     * @param x1 
     * @param y1 
     * @param x2 
     * @param y2 
     * @returns 
     */
    checkKingMovement(x1: number, y1: number, x2: number, y2: number) {
        if(!this.validCoordinatesChecker(x1, y1, x2, y2)) {
            console.log("Invalid movement coordinates were sent for king");
            return false;
        }
        // Checks to see if there is another piece of the same color occupying the space the King is to move to.
        if(this.chessBoard[x2][y2].getColor() == this.chessBoard[x1][y1].getColor()) {
            return false;
        }
        var selectedKing: King = this.chessBoard[x1][y1];
        // The king can move one space in any direction, and there is no need to check for their path being blocked by an enemy pawn as it will remove an enemy pawn.
        if((x2 == x1+1 || x2 == x1-1 || x2 == x1) && (y2 == y1+1 || y2 == y1-1 || y2 == y1)) {
            return true;
        }
        console.log("Bad coordinates sent for movment of king.");
        return false;
    }

    /**
     * This method will check a Queen's movement and return true if it is valid, false if otherwise.
     * 
     * @param x1 
     * @param y1 
     * @param x2 
     * @param y2 
     * @returns 
     */
    checkQueenMovement(x1: number, y1: number, x2: number, y2: number) {
        if(!this.validCoordinatesChecker(x1, y1, x2, y2)) {
            return false;
        }
        if(this.chessBoard[x1][y1].getColor() == this.chessBoard[x2][y2].getColor()) {
            return false;
        }
        if(this.goodDiagonalPathChecker(x1, y1, x2, y2) || this.goodHorizontalVerticalPathChecker(x1, y1, x2, y2)) {
            return true;
        }
        return false;
    }

    /**
     * This method will check a Rook's movement and return true if it is valid, false if otherwise.
     * 
     * @param x1 
     * @param y1 
     * @param x2 
     * @param y2 
     * @returns 
     */
    checkRookMovement(x1: number, y1: number, x2: number, y2: number) {
        if(!this.validCoordinatesChecker(x1, y1, x2, y2)) {
            return false;
        }
        if(this.chessBoard[x1][y1].getColor() == this.chessBoard[x2][y2].getColor()) {
            return false;
        }
        if(this.goodHorizontalVerticalPathChecker(x1, y1, x2, y2)) {
            return true;
        }
        return false;
    }

    /**
     * This method will check a Bishop's movement and return true if it is valid, false if otherwise.
     * 
     * @param x1 
     * @param y1 
     * @param x2 
     * @param y2 
     * @returns 
     */
    checkBishopMovement(x1: number, y1: number, x2: number, y2: number) {
        if(!this.validCoordinatesChecker(x1, y1, x2, y2)) {
            return false;
        }
        if(this.chessBoard[x1][y1].getColor() == this.chessBoard[x2][y2].getColor()) {
            return false;
        }
        // The bishop can move in any direction diagonally, the goodDiagonalPathChecker method will ensure that the diagonal path is correct and that there is no obstructions in its way.
        if(this.goodDiagonalPathChecker(x1, y1, x2, y2)) {
            return true;
        }
        return false;
    }

    /**
     * This method will check a Knight's movement and return true if it is valid, false if otherwise.
     * 
     * @param x1 
     * @param y1 
     * @param x2 
     * @param y2 
     * @returns 
     */
    checkKnightMovement(x1: number, y1: number, x2: number, y2: number) {
        if(!this.validCoordinatesChecker(x1, y1, x2, y2)) {
            return false;
        }
        if(this.chessBoard[x1][y1].getColor() == this.chessBoard[x2][y2].getColor()) {
            return false;
        }
        // The Knight must move in an L shape, horizontally by 1 or 2 spaces and vertically by 2 or 1 spaces, respectively. Taking the absolute value and performing 2 if statements
        // accounts for all variants of this instead of having to do 8 if statements.
        var xDiff = Math.abs(x2 - x1);
        var yDiff = Math.abs(y2 - y1);
        if((xDiff == 2 && yDiff == 1) || (xDiff == 1 && yDiff == 2)) {
            return true;
        }
        return false;
    }
}