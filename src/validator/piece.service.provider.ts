import { Piece } from './piece.service';

const pieceFactory = (color: string) => new Piece(color);
export const pieceProvider = {
  provide: Piece,
  useFactory: pieceFactory,
};
