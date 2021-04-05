let pointMap = new Map([
    ["PAWN", 1],
    ["KNIGHT", 3],
    ["BISHOP", 3],
    ["ROOK", 5],
    ["QUEEN", 9]
]);

/**
 * This class is the generic class that all chess pieces are extended from. It contains the color of the chess piece as well as a method to retrieve that color.
 * 
 */
class Piece {
    color: String = "UNSPECIFIED";
    points: number | undefined;
    

    constructor(specifiedColor: string) {
        this.setColor(specifiedColor);
    }

    /**
     * This method will set the color of the piece, "WHITE" for a white piece and "BLACK" for a black piece. Will not be used in the game, but will be used in the editor.
     * 
     * @param specifiedColor 
     */
    setColor(specifiedColor: string) {
        if(specifiedColor == "WHITE" || specifiedColor == "BLACK") {
            this.color = specifiedColor;
        }
        else {
            console.log("Piece class tried to assign a color to a Piece that was not WHITE or BLACK. Attempted color assignment: " + specifiedColor);
        }
    }

    /**
     * This method will return the color of the piece, "WHITE" for a white piece and "BLACK" for a black piece.
     * 
     */
    getColor() {
        return this.color;
    }

    /**
     * This method will return the name of the Piece, will be used in the classes for other chess pieces to specify their name.
     * 
     */
    getName() {
        return "UNSPECIFIED";
    }

    /**
     * This method returns the points assigned to the Piece.
     * @returns this.points
     */
    getPoints() {
        return this.points;
    }

    setPoints(specifiedType: string){
        if(pointMap.has(specifiedType)){
            this.points = pointMap.get(specifiedType);
        }
    }
}