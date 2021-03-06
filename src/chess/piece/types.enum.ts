export enum Piece {
  empty,
  whiteRook,
  blackRook,
  whitePawn,
  blackPawn,
  whiteKnight,
  blackKnight,
  whiteBishop,
  blackBishop,
  whiteKing,
  blackKing,
  whiteQueen,
  blackQueen,
  rook = whiteRook || blackRook,
  pawn = whitePawn || blackPawn,
  bishop = whiteBishop || blackBishop,
  knight = whiteKnight || blackKnight,
  king = whiteKing || blackKing,
  queen = whiteQueen || blackQueen,
}
export enum FEN {
  blackPawn = 'p',
  whitePawn = 'P',
  blackRook = 'r',
  whiteRook = 'R',
  whiteBishop = 'B',
  blackBishop = 'b',
  whiteKnight = 'N',
  blackKnight = 'n',
  whiteKing = 'K',
  blackKing = 'k',
  whiteQueen = 'Q',
  blackQueen = 'q',
}
