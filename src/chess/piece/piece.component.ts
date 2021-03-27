import { Component, OnInit, Input } from '@angular/core';
import { Types, FEN } from "./types.enum"

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})

/**
	Class: PieceComponent
	
	Properties:
	
	- type:Types = Types.BlackPawn;
*/
export class PieceComponent implements OnInit {
  ptype:Types = Types.None;
	@Input('pid')
	pid:number = 0;
	@Input('piece')
	piece:string = "";
	/**
	Function: getImage()
	
	Returns file name corresponding to the piece's type.
	**/
  getImage(){
        switch(this.ptype){
            case Types.BlackPawn:
                return "Chess_pdt45.svg";
            case Types.WhitePawn:
                return "Chess_plt45.svg";
            case Types.BlackKnight:
                return "Chess_ndt45.svg";
            case Types.WhiteKnight:
                return "Chess_nlt45.svg";
            case Types.WhiteBishop:
                return "Chess_blt45.svg";
            case Types.BlackBishop:
                return "Chess_bdt45.svg";
            case Types.BlackQueen:
                return "Chess_qdt45.svg";
            case Types.WhiteQueen:
                return "Chess_qlt45.svg";
            case Types.WhiteKing:
                return "Chess_klt45.svg";
            case Types.BlackKing:
                return "Chess_kdt45.svg";
            case Types.BlackRook:
                return "Chess_rdt45.svg";
            case Types.WhiteRook:
                return "Chess_rlt45.svg";
            default:
                return "NONE";
        }
  }
  set(num:number){
  	this.ptype = num;
  }
  ngOnChanges(){
  	this.setFEN(this.piece);
  }
  get(){
	return this.ptype;  
  }
  toFENString(){
   switch(this.ptype){
            case Types.BlackPawn:
                return FEN.BlackPawn;
            case Types.WhitePawn:
                return FEN.WhitePawn;
            case Types.BlackKnight:
                return FEN.BlackKnight;
            case Types.WhiteKnight:
                return FEN.WhiteKnight;
            case Types.WhiteBishop:
                return FEN.WhiteBishop;
            case Types.BlackBishop:
                return FEN.BlackBishop;
            case Types.BlackQueen:
                return FEN.BlackQueen;
            case Types.WhiteQueen:
                return FEN.WhiteQueen;
            case Types.WhiteKing:
                return FEN.WhiteKing;
            case Types.BlackKing:
                return FEN.BlackKing;
            case Types.BlackRook:
                return FEN.BlackRook;
            case Types.WhiteRook:
                return FEN.WhiteRook;
            default:
                return 1;
        }
  }
  setFEN(fen:string){
 		let fe =  fen;
 		switch(fe){
 			 case  FEN.BlackPawn:
                this.ptype = Types.BlackPawn;
                return;
            case FEN.WhitePawn:
                this.ptype =  Types.WhitePawn;
                return;
            case FEN.BlackKnight:
                this.ptype =  Types.BlackKnight;
                break;
            case FEN.WhiteKnight:
                this.ptype =  Types.WhiteKnight;
                break;
            case FEN.WhiteBishop:
                this.ptype =  Types.WhiteBishop;
                break;
            case FEN.BlackBishop:
                this.ptype =  Types.BlackBishop;
                break;
            case FEN.BlackQueen:
                this.ptype =  Types.BlackQueen;
                break;
            case FEN.WhiteQueen:
                this.ptype =  Types.WhiteQueen;
                break;
            case FEN.WhiteKing:
                this.ptype =  Types.WhiteKing;
                break;
            case FEN.BlackKing:
                this.ptype =  Types.BlackKing;
                break;
            case FEN.BlackRook:
                this.ptype =  Types.BlackRook;
                break;
            case FEN.WhiteRook:
                this.ptype =  Types.WhiteRook;	
                break;
            default:
            	this.ptype = Types.None;
            	break;
 		}
  	}
  
  constructor() { }

  ngOnInit(): void {
		  
			this.setFEN(this.piece)		  
		  
  }

}
