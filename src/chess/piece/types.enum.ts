export enum Types {
	BlackPawn, WhitePawn, Pawn = BlackPawn | WhitePawn, BlackRook, WhiteRook, Rook = BlackRook | WhiteRook, WhiteBishop,
	BlackBishop, Bishop = WhiteBishop | BlackBishop, WhiteKnight, BlackKnight, 
	Knight = WhiteKnight | BlackKnight, 
	WhiteKing, BlackKing, King = WhiteKing | BlackKing, WhiteQueen, BlackQueen, 
	Queen= BlackQueen | WhiteQueen,
	Black = BlackPawn | BlackRook | BlackBishop | BlackKnight | BlackKing | BlackQueen, 
	White = WhitePawn | WhiteRook | WhiteBishop | WhiteKnight | WhiteKing | WhiteQueen
}
enum FEN {
	BlackPawn = 'p', WhitePawn='P',
	 BlackRook = 'r', WhiteRook='R', 
	  WhiteBishop = 'B', BlackBishop = 'b', 
	   WhiteKnight = 'N', BlackKnight = 'n',
	WhiteKing = 'K', BlackKing = 'k', 
	WhiteQueen = 'Q', BlackQueen = 'q'

}