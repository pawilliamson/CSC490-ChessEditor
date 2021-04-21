import { Piece } from './piece.service';

let pieceFactory = (color:string)=>{
 return new Piece(color);
};
export let PieceProvider = {
	provide: Piece,
	useFactory: pieceFactory,
	};
