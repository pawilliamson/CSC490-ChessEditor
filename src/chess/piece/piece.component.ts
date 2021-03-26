import { Component, OnInit } from '@angular/core';
import { Types } from "./types.enum"
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
  type:Types = Types.BlackPawn;

	/**
	Function: getImage()
	
	Returns file name corresponding to the piece's type.
	**/
  getImage(){
        switch(this.type){
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
  
  constructor() { }

  ngOnInit(): void {
  }

}
