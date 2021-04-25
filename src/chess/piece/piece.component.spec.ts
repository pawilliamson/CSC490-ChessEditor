import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceComponent } from './piece.component';
import { BoardComponent } from '../board/board.component';
import { Types } from './types.enum';
import {
  Piece,
  Pawn,
  Rook,
  Bishop,
  ValidatorBoard,
  Knight,
  Queen,
  King,
  Board,
} from '../../validator/validator.module';
describe('PieceComponent', () => {
  let component: PieceComponent;
  let pieceComponentMock: PieceComponent;
  let piece: Piece;
  const xStartPosition = 3;
  const yStartPosition = 3;
  const boardStart = 0;
  const boardEnd = 7;

  let fixture: ComponentFixture<PieceComponent>;
  let board: ValidatorBoard = new ValidatorBoard();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieceComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Pawns', () => {
    const pawn: Pawn = new Pawn('WHITE');
    const otherPiece: Pawn = new Pawn('BLACK');

    beforeEach(() => {
      board = new ValidatorBoard();
    });

    it('should move correctly when white', () => {
      pawn.setColor('WHITE');
      board.chessBoard[xStartPosition][yStartPosition] = pawn;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition,
          yStartPosition + 1
        )
      ).toBeTrue();
    });

    it('should move correctly when black', () => {
      pawn.setColor('BLACK');
      board.chessBoard[xStartPosition][yStartPosition] = pawn;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition,
          yStartPosition - 1
        )
      ).toBeTrue();
    });

    it('should not be allowed to occupy the same cell as a piece with any color', () => {
      board.chessBoard[xStartPosition][yStartPosition] = pawn;
      board.chessBoard[xStartPosition][yStartPosition + 1] = otherPiece;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition,
          yStartPosition + 1
        )
      ).toBeFalse();
    });

    it('should be able to capture an opposing piece', () => {
      pawn.setColor('WHITE');
      otherPiece.setColor('BLACK');
      board.chessBoard[xStartPosition][yStartPosition] = pawn;
      board.chessBoard[xStartPosition + 1][yStartPosition + 1] = otherPiece;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition + 1,
          yStartPosition + 1
        )
      ).toBeTrue();
    });

    it('should not be able to capture a piece with the same color', () => {
      pawn.setColor('WHITE');
      otherPiece.setColor('WHITE');
      board.chessBoard[xStartPosition][yStartPosition] = pawn;
      board.chessBoard[xStartPosition + 1][yStartPosition + 1] = otherPiece;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition + 1,
          yStartPosition + 1
        )
      ).toBeFalse();
    });
  });

  describe('Rooks', () => {
    const rook: Rook = new Rook('BLACK');
    const otherPiece: Pawn = new Pawn('WHITE');
    beforeEach(() => {
      board = new ValidatorBoard();
    });

    it('should be able to move horizontally', () => {
      board.chessBoard[xStartPosition][yStartPosition] = rook;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          boardEnd,
          yStartPosition
        )
      ).toBeTrue();
    });

    it('should be able to move vertically', () => {
      board.chessBoard[xStartPosition][yStartPosition] = rook;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          boardEnd,
          yStartPosition
        )
      ).toBeTrue();
    });

    it('should not be able to move diagonally', () => {
      const diag =
        xStartPosition > yStartPosition
          ? xStartPosition - 1
          : yStartPosition - 1;
      board.chessBoard[xStartPosition][yStartPosition] = rook;
      expect(
        board.validateMovement(
          xStartPosition,
          xStartPosition,
          xStartPosition - diag,
          yStartPosition - diag
        )
      ).toBeFalse();
    });

    it('should be able to capture an opposing piece', () => {
      rook.setColor('WHITE');
      otherPiece.setColor('BLACK');
      board.chessBoard[xStartPosition][yStartPosition] = rook;
      board.chessBoard[xStartPosition + 1][yStartPosition] = otherPiece;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition + 1,
          yStartPosition
        )
      ).toBeTrue();
    });

    it('should not be able to capture a piece with the same color', () => {
      rook.setColor('WHITE');
      otherPiece.setColor('WHITE');
      board.chessBoard[xStartPosition][yStartPosition] = rook;
      board.chessBoard[xStartPosition + 1][yStartPosition] = otherPiece;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition + 1,
          yStartPosition
        )
      ).toBeFalse();
    });

    it('should not be able to pass through another piece to get to a cell', () => {
      rook.setColor('WHITE');
      otherPiece.setColor('BLACK');
      board.chessBoard[yStartPosition][xStartPosition] = rook;
      board.chessBoard[yStartPosition][xStartPosition + 1] = otherPiece;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition + 2,
          yStartPosition
        )
      ).toBeFalse();
    });
  });

  describe('Bishops', () => {
    const bishop: Bishop = new Bishop('BLACK');
    const otherPiece: Pawn = new Pawn('WHITE');
    beforeEach(() => {
      board = new ValidatorBoard();
    });
    it('should not be able to move horizontally', () => {
      board.chessBoard[xStartPosition][yStartPosition] = bishop;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          boardEnd,
          yStartPosition
        )
      ).toBeFalse();
    });

    it('should not be able to move vertically', () => {
      board.chessBoard[xStartPosition][yStartPosition] = bishop;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          boardEnd,
          yStartPosition
        )
      ).toBeFalse();
    });

    it('should be able to move diagonally', () => {
      const diag =
        xStartPosition > yStartPosition
          ? xStartPosition - 1
          : yStartPosition - 1;
      board.chessBoard[xStartPosition][yStartPosition] = bishop;
      expect(
        board.validateMovement(
          xStartPosition,
          xStartPosition,
          xStartPosition + 1,
          yStartPosition - 1
        )
      ).toBeTrue();
    });

    it('should be able to capture an opposing piece', () => {
      bishop.setColor('WHITE');
      otherPiece.setColor('BLACK');
      board.chessBoard[xStartPosition][yStartPosition] = bishop;
      board.chessBoard[xStartPosition + 1][yStartPosition + 1] = otherPiece;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition + 1,
          yStartPosition + 1
        )
      ).toBeTrue();
    });

    it('should not be able to capture a piece with the same color', () => {
      bishop.setColor('WHITE');
      otherPiece.setColor('WHITE');
      board.chessBoard[xStartPosition][yStartPosition] = bishop;
      board.chessBoard[xStartPosition + 1][yStartPosition + 1] = otherPiece;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition + 1,
          yStartPosition + 1
        )
      ).toBeFalse();
    });

    it('should not be able to pass through another piece to get to a cell', () => {
      board.chessBoard[xStartPosition][yStartPosition] = bishop;
      board.chessBoard[xStartPosition + 1][yStartPosition + 1] = otherPiece;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition + 2,
          yStartPosition + 2
        )
      ).toBeFalse();
    });
  });

  describe('Knights', () => {
    const knight: Knight = new Knight('BLACK');
    const otherPiece: Pawn = new Pawn('WHITE');
    beforeEach(() => {
      board = new ValidatorBoard();
    });

    it('should not be able to move horizontally', () => {
      board.chessBoard[xStartPosition][yStartPosition] = knight;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          boardEnd,
          yStartPosition
        )
      ).toBeFalse();
    });

    it('should not be able to move vertically', () => {
      board.chessBoard[xStartPosition][yStartPosition] = knight;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          boardEnd,
          yStartPosition
        )
      ).toBeFalse();
    });

    it('should not be able to move diagonally', () => {
      const diag =
        xStartPosition > yStartPosition
          ? xStartPosition - 1
          : yStartPosition - 1;
      board.chessBoard[xStartPosition][yStartPosition] = knight;
      expect(
        board.validateMovement(
          xStartPosition,
          xStartPosition,
          xStartPosition - diag,
          yStartPosition - diag
        )
      ).toBeFalse();
    });

    it('should move like a knight, similar to an L', () => {
      board.chessBoard[xStartPosition][yStartPosition] = knight;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition + 2,
          yStartPosition + 1
        )
      ).toBeTrue();
    });

    it('should be able to capture an opposing piece', () => {
      knight.setColor('WHITE');
      otherPiece.setColor('BLACK');
      board.chessBoard[xStartPosition][yStartPosition] = knight;
      board.chessBoard[xStartPosition + 2][yStartPosition + 1] = otherPiece;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition + 2,
          yStartPosition + 1
        )
      ).toBeTrue();
    });

    it('should not be able to capture a piece with the same color', () => {
      knight.setColor('WHITE');
      otherPiece.setColor('WHITE');
      board.chessBoard[xStartPosition][yStartPosition] = knight;
      board.chessBoard[xStartPosition + 2][yStartPosition + 1] = otherPiece;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition + 1,
          yStartPosition + 1
        )
      ).toBeFalse();
    });

    /**
     * I don't think this applies for knights. - DeMO
     */
    it('should not be able to pass through another piece to get to a cell', () => {
      knight.setColor('WHITE');
      otherPiece.setColor('WHITE');
      board.chessBoard[xStartPosition][yStartPosition] = knight;
      board.chessBoard[xStartPosition + 2][yStartPosition] = otherPiece;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition + 2,
          yStartPosition
        )
      ).toBeFalse();
    });
  });

  describe('Queens', () => {
    const queen: Queen = new Queen('WHITE');
    const otherPiece: Pawn = new Pawn('BLACK');
    beforeEach(() => {
      board = new ValidatorBoard();
    });

    it('should be able to move horizontally', () => {
      board.chessBoard[xStartPosition][yStartPosition] = queen;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          boardEnd,
          yStartPosition
        )
      ).toBeTrue();
    });

    it('should be able to move vertically', () => {
      board.chessBoard[xStartPosition][yStartPosition] = queen;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition,
          boardStart
        )
      ).toBeTrue();
    });

    it('should be able to move diagonally', () => {
      const diag =
        xStartPosition > yStartPosition
          ? xStartPosition - 1
          : yStartPosition - 1;
      board.chessBoard[xStartPosition][yStartPosition] = queen;
      expect(
        board.validateMovement(
          xStartPosition,
          xStartPosition,
          xStartPosition - diag,
          yStartPosition - diag
        )
      ).toBeTrue();
    });

    it('should be able to capture an opposing piece', () => {
      queen.setColor('WHITE');
      otherPiece.setColor('BLACK');
      board.chessBoard[xStartPosition][yStartPosition] = queen;
      board.chessBoard[xStartPosition + 1][yStartPosition] = otherPiece;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition + 1,
          yStartPosition
        )
      ).toBeTrue();
    });

    it('should not be able to capture a piece with the same color', () => {
      queen.setColor('WHITE');
      otherPiece.setColor('WHITE');
      board.chessBoard[xStartPosition][yStartPosition] = queen;
      board.chessBoard[xStartPosition + 1][yStartPosition + 1] = otherPiece;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition + 1,
          yStartPosition + 1
        )
      ).toBeFalse();
    });
  });

  describe('Kings', () => {
    const king: King = new King('BLACK');
    const otherPiece: Pawn = new Pawn('WHITE');
    beforeEach(() => {
      board = new ValidatorBoard();
    });
    it('should be able to move only one space', () => {
      board.chessBoard[xStartPosition][yStartPosition] = king;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition + 1,
          yStartPosition
        )
      ).toBeTrue();
    });

    it('should not be able to move more than one space', () => {
      board = new ValidatorBoard();
      board.chessBoard[xStartPosition][yStartPosition] = king;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition + 2,
          yStartPosition
        )
      ).toBeFalse();
    });

    it('should be able to capture an opposing piece', () => {
      king.setColor('WHITE');
      otherPiece.setColor('BLACK');
      board.chessBoard[xStartPosition][yStartPosition] = king;
      board.chessBoard[xStartPosition + 1][yStartPosition] = otherPiece;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition + 1,
          yStartPosition
        )
      ).toBeTrue();
    });

    it('should not be able to capture a piece with the same color', () => {
      king.setColor('WHITE');
      otherPiece.setColor('WHITE');
      board.chessBoard[xStartPosition][yStartPosition] = king;
      board.chessBoard[xStartPosition + 1][yStartPosition + 1] = otherPiece;
      expect(
        board.validateMovement(
          xStartPosition,
          yStartPosition,
          xStartPosition + 1,
          yStartPosition + 1
        )
      ).toBeFalse();
    });
  });
});
