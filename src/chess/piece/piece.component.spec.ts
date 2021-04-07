import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceComponent } from './piece.component';
import { BoardComponent } from '../board/board.component';
import { Types } from './types.enum';

describe('PieceComponent', () => {
  let component: PieceComponent;
  let pieceComponentMock: PieceComponent;
  let piece: Piece;
  let xStartPosition = 3;
  let yStartPosition = 3;

  let fixture: ComponentFixture<PieceComponent>;
  let board: ValidatorBoard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Pawns', function() {
    let pawn: Pawn;
    let otherPiece: Pawn;

    it('should move correctly when white', () => {
      pawn.setColor('WHITE');
      board.chessBoard[xStartPosition][yStartPosition] = pawn;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition, yStartPosition + 1)).toBeTrue();
    });

    it('should move correctly when black', () => {
      pawn.setColor('BLACK');
      board.chessBoard[xStartPosition][yStartPosition] = pawn;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition, yStartPosition - 1)).toBeTrue();
    });
 
    it('should not be allowed to occupy the same cell as a piece with any color', () => {
      pawn.setColor('WHITE');
      otherPiece.setColor('WHITE');
      board.chessBoard[xStartPosition][yStartPosition] = pawn;
      board.chessBoard[xStartPosition][yStartPosition + 1] = otherPiece;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition, yStartPosition + 1)).toBeFalse();

      otherPiece.setColor('BLACK');
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition, yStartPosition + 1)).toBeFalse();
    });

    it('should be able to capture an opposing piece', () => {
      pawn.setColor('WHITE');
      otherPiece.setColor('BLACK');
      board.chessBoard[xStartPosition][yStartPosition] = pawn;
      board.chessBoard[xStartPosition + 1][yStartPosition + 1] = otherPiece;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition + 1, yStartPosition + 1)).toBeTrue();
    });

    it('should not be able to capture a piece with the same color', () => {
      pawn.setColor('WHITE');
      otherPiece.setColor('WHITE');
      board.chessBoard[xStartPosition][yStartPosition] = pawn;
      board.chessBoard[xStartPosition + 1][yStartPosition + 1] = otherPiece;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition + 1, yStartPosition + 1)).toBeFalse();
    });
  });

  describe('Kings', function() {
    let king: King;
    let otherPiece: Pawn;

    it('should be able to move only one space', () => {
      board.chessBoard[xStartPosition][yStartPosition] = king;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition + 1, yStartPosition)).toBeTrue();
    });

    it('should not be able to move more than one space', () => {
      board.chessBoard[xStartPosition][yStartPosition] = king;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition + 2, yStartPosition)).toBeFalse();
    });

    it('should be able to capture an opposing piece', () => {
      king.setColor('WHITE');
      otherPiece.setColor('BLACK');
      board.chessBoard[xStartPosition][yStartPosition] = king;
      board.chessBoard[xStartPosition + 1][yStartPosition] = otherPiece;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition + 1, yStartPosition)).toBeTrue();
    });
  });
});