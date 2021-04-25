// File: Piece.component.ts
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FEN, Piece } from './types.enum';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css'],
})

/**
 * Class: PieceComponent
 * Properties:
 * - type:PieceType = PieceType.blackPawn;
 */
export class PieceComponent implements OnInit, OnChanges {
  @Input()
  pid = 0;
  @Input()
  piece = '';
  ptype: Piece = Piece.empty;

  /**
   * Function: constructor
   */
  constructor() {}
  /**
   * Function: getImage()
   * Returns file name corresponding to the Piece's type.
   **/
  getImage() {
    switch (this.ptype) {
      case Piece.blackPawn:
        return 'Chess_pdt45.svg';
      case Piece.whitePawn:
        return 'Chess_plt45.svg';
      case Piece.blackKnight:
        return 'Chess_ndt45.svg';
      case Piece.whiteKnight:
        return 'Chess_nlt45.svg';
      case Piece.whiteBishop:
        return 'Chess_blt45.svg';
      case Piece.blackBishop:
        return 'Chess_bdt45.svg';
      case Piece.blackQueen:
        return 'Chess_qdt45.svg';
      case Piece.whiteQueen:
        return 'Chess_qlt45.svg';
      case Piece.whiteKing:
        return 'Chess_klt45.svg';
      case Piece.blackKing:
        return 'Chess_kdt45.svg';
      case Piece.blackRook:
        return 'Chess_rdt45.svg';
      case Piece.whiteRook:
        return 'Chess_rlt45.svg';
      default:
        return 'NONE';
    }
  }
  /**
   * Function: set
   *
   * Alternative way to define a Piece.
   */
  set(num: number) {
    this.ptype = num;
  }
  /**
   * Function: ngOnChanges
   *
   */
  ngOnChanges() {
    this.setFEN(this.piece);
  }
  /**
   * Function: get
   *
   * Returns int enumeration of Piece
   */
  get() {
    return this.ptype;
  }
  /**
   * Function: toFENString
   */
  toFENString() {
    switch (this.ptype) {
      case Piece.blackPawn:
        return FEN.blackPawn;
      case Piece.whitePawn:
        return FEN.whitePawn;
      case Piece.blackKnight:
        return FEN.blackKnight;
      case Piece.whiteKnight:
        return FEN.whiteKnight;
      case Piece.whiteBishop:
        return FEN.whiteBishop;
      case Piece.blackBishop:
        return FEN.blackBishop;
      case Piece.blackQueen:
        return FEN.blackQueen;
      case Piece.whiteQueen:
        return FEN.whiteQueen;
      case Piece.whiteKing:
        return FEN.whiteKing;
      case Piece.blackKing:
        return FEN.blackKing;
      case Piece.blackRook:
        return FEN.blackRook;
      case Piece.whiteRook:
        return FEN.whiteRook;
      default:
        return 1;
    }
  }
  /**
   * Function: setFEN
   *
   */
  setFEN(fen: string) {
    const fe = fen;
    switch (fe) {
      case FEN.blackPawn:
        this.ptype = Piece.blackPawn;
        return;
      case FEN.whitePawn:
        this.ptype = Piece.whitePawn;
        return;
      case FEN.blackKnight:
        this.ptype = Piece.blackKnight;
        break;
      case FEN.whiteKnight:
        this.ptype = Piece.whiteKnight;
        break;
      case FEN.whiteBishop:
        this.ptype = Piece.whiteBishop;
        break;
      case FEN.blackBishop:
        this.ptype = Piece.blackBishop;
        break;
      case FEN.blackQueen:
        this.ptype = Piece.blackQueen;
        break;
      case FEN.whiteQueen:
        this.ptype = Piece.whiteQueen;
        break;
      case FEN.whiteKing:
        this.ptype = Piece.whiteKing;
        break;
      case FEN.blackKing:
        this.ptype = Piece.blackKing;
        break;
      case FEN.blackRook:
        this.ptype = Piece.blackRook;
        break;
      case FEN.whiteRook:
        this.ptype = Piece.whiteRook;
        break;
      default:
        this.ptype = Piece.empty;
        break;
    }
  }

  /**
   * Function: ngOnInit
   */
  ngOnInit(): void {
    this.setFEN(this.piece);
  }
}
