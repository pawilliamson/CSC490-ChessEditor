/**
 * This class is the generic class that all chess pieces are extended from. It contains the color of the chess piece as well as a method to retrieve that color.
 * 
 */
class Piece {
    color: String = "";

    constructor(specifiedColor: string) {
        this.color = specifiedColor;
    }

    /**
     * This method will set the color of the piece, "White" for a white piece and "Black" for a black piece.
     * 
     * @param specifiedColor 
     */
    setColor(specifiedColor: string) {
        this.color = specifiedColor;
    }

    /**
     * This method will return the color of the piece, "White" for a white piece and "Black" for a black piece.
     * 
     */
    getColor() {
        return this.color;
    }


}