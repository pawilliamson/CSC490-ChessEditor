import { Piece } from './piece.service';

const pieceFactory = (color: string)=>new Piece(color);
export const PieceProvider = {
	provide: Piece,
	useFactory: pieceFactory,
	};
