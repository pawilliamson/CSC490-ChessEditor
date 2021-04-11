import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceComponent } from './piece.component';
import { BoardComponent } from '../board/board.component';
import { Types } from './types.enum';
import { Piece, Pawn, Rook, Bishop, ValidatorBoard, Knight, Queen, King, Board }from '../../validator/validator.module';
describe('PieceComponent', () => {
  let component: PieceComponent;
  let pieceComponentMock: PieceComponent;
  let piece: Piece;
  let xStartPosition = 3, yStartPosition = 3;
  let boardStart = 0, boardEnd = 8;

  let fixture: ComponentFixture<PieceComponent>;
  let board: ValidatorBoard = new ValidatorBoard();

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
  let xStartPosition = 3, yStartPosition = 3;
    let pawn: Pawn = new Pawn("UNSPECIFIED");
    let otherPiece: Pawn = new Pawn("UNSPECIFIED");

    it('should move correctly when white', () => {;
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
      board.chessBoard[xStartPosition][yStartPosition] = pawn;
      board.chessBoard[xStartPosition][yStartPosition + 1] = otherPiece;
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

  describe('Rooks', function() {
    let rook: Rook = new Rook("BLACK");
    let otherPiece:Pawn = new Pawn("WHITE");
	let xStartPosition = 3;
	let yStartPosition = 3;
	let board = new ValidatorBoard();
    it('should be able to move horizontally', () => {
    
      board.chessBoard[xStartPosition][yStartPosition] = rook;
      expect(board.validateMovement(xStartPosition, yStartPosition, boardEnd, yStartPosition)).toBeTrue();
    });

    it('should be able to move vertically', () => {
      board.chessBoard[xStartPosition][yStartPosition] = rook;
      expect(board.validateMovement(xStartPosition, yStartPosition, boardEnd, yStartPosition)).toBeTrue();
    });

    it('should not be able to move diagonally', () => {
      let diag = xStartPosition > yStartPosition ? xStartPosition - 1 : yStartPosition - 1;
      board.chessBoard[xStartPosition][yStartPosition] = rook;
      expect(board.validateMovement(xStartPosition, xStartPosition, xStartPosition - diag, yStartPosition - diag)).toBeFalse();
    });

    it('should be able to capture an opposing piece', () => {
      rook.setColor('WHITE');
      otherPiece.setColor('BLACK');
      board.chessBoard[xStartPosition][yStartPosition] = rook;
      board.chessBoard[xStartPosition + 1][yStartPosition] = otherPiece;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition + 1, yStartPosition)).toBeTrue();
    });

    it('should not be able to capture a piece with the same color', () => {
      rook.setColor('WHITE');
      otherPiece.setColor('WHITE');
      board.chessBoard[xStartPosition][yStartPosition] = rook;
      board.chessBoard[xStartPosition + 1][yStartPosition] = otherPiece;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition + 1, yStartPosition)).toBeFalse();
    });

    it('should not be able to pass through another piece to get to a cell', () => {
      board.chessBoard[xStartPosition][yStartPosition] = rook;
      board.chessBoard[xStartPosition + 1][yStartPosition] = otherPiece;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition + 2, yStartPosition)).toBeFalse();
    });
  });

  describe('Bishops', function() {
    let bishop: Bishop = new  Bishop("UNSPECIFIED");
    let otherPiece: Pawn = new Pawn("UNSPECIFIED");
	let xStartPosition = 3;
	let yStartPosition = 3;
    it('should not be able to move horizontally', () => {
      board.chessBoard[xStartPosition][yStartPosition] = bishop;
      expect(board.validateMovement(xStartPosition, yStartPosition, boardEnd, yStartPosition)).toBeFalse();
    });

    it('should not be able to move vertically', () => {
      board.chessBoard[xStartPosition][yStartPosition] = bishop;
      expect(board.validateMovement(xStartPosition, yStartPosition, boardEnd, yStartPosition)).toBeFalse();
    });

    it('should be able to move diagonally', () => {
      let diag = xStartPosition > yStartPosition ? xStartPosition - 1 : yStartPosition - 1;
      board.chessBoard[xStartPosition][yStartPosition] = bishop;
      expect(board.validateMovement(xStartPosition, xStartPosition, xStartPosition + 1, yStartPosition - 1)).toBeTrue();
    });

    it('should be able to capture an opposing piece', () => {
      bishop.setColor('WHITE');
      otherPiece.setColor('BLACK');
      board.chessBoard[xStartPosition][yStartPosition] = bishop;
      board.chessBoard[xStartPosition + 1][yStartPosition + 1] = otherPiece;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition + 1, yStartPosition + 1)).toBeTrue();
    });

    it('should not be able to capture a piece with the same color', () => {
      bishop.setColor('WHITE');
      otherPiece.setColor('WHITE');
      board.chessBoard[xStartPosition][yStartPosition] = bishop;
      board.chessBoard[xStartPosition + 1][yStartPosition + 1] = otherPiece;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition + 1, yStartPosition + 1)).toBeFalse();
    });

    it('should not be able to pass through another piece to get to a cell', () => {
      board.chessBoard[xStartPosition][yStartPosition] = bishop;
      board.chessBoard[xStartPosition + 1][yStartPosition + 1] = otherPiece;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition + 2, yStartPosition + 2)).toBeFalse();
    });
  });

  describe('Knights', function() {
    let knight: Knight = new Knight("UNSPECIFIED");
    let otherPiece: Pawn = new Pawn("UNSPECIFIED");
	let xStartPosition = 3;
	let yStartPosition = 3;
	board = new ValidatorBoard();
	
    it('should not be able to move horizontally', () => {
    let xStartPosition = 3, yStartPosition = 3;
      board.chessBoard[xStartPosition][yStartPosition] = knight;
      expect(board.validateMovement(xStartPosition, yStartPosition, boardEnd, yStartPosition)).toBeFalse();
    });

    it('should not be able to move vertically', () => {
      board.chessBoard[xStartPosition][yStartPosition] = knight;
      expect(board.validateMovement(xStartPosition, yStartPosition, boardEnd, yStartPosition)).toBeFalse();
    });

    it('should not be able to move diagonally', () => {
      let diag = xStartPosition > yStartPosition ? xStartPosition - 1 : yStartPosition - 1;
      board.chessBoard[xStartPosition][yStartPosition] = knight;
      expect(board.validateMovement(xStartPosition, xStartPosition, xStartPosition - diag, yStartPosition - diag)).toBeFalse();
    });

    it('should move like a knight, similar to an L', () => {
      board.chessBoard[xStartPosition][yStartPosition] = knight;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition + 2, yStartPosition + 1)).toBeTrue();
    });

    it('should be able to capture an opposing piece', () => {
      knight.setColor('WHITE');
      otherPiece.setColor('BLACK');
      board.chessBoard[xStartPosition][yStartPosition] = knight;
      board.chessBoard[xStartPosition + 1][yStartPosition] = otherPiece;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition + 1, yStartPosition)).toBeTrue();
    });

    it('should not be able to capture a piece with the same color', () => {
      knight.setColor('WHITE');
      otherPiece.setColor('WHITE');
      board.chessBoard[xStartPosition][yStartPosition] = knight;
      board.chessBoard[xStartPosition + 1][yStartPosition + 1] = otherPiece;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition + 1, yStartPosition + 1)).toBeFalse();
    });

    it('should not be able to pass through another piece to get to a cell', () => {
      board.chessBoard[xStartPosition][yStartPosition] = knight;
      board.chessBoard[xStartPosition + 2][yStartPosition] = otherPiece;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition + 2, yStartPosition)).toBeFalse();
    });
  });

  describe('Queens', function() {
    let queen: Queen = new Queen("WHITE");
    let otherPiece: Pawn = new Pawn("BLACK");
    let xStartPosition = 3;
	let yStartPosition = 3;
    board = new ValidatorBoard();

    it('should be able to move horizontally', () => {
   
      board.chessBoard[xStartPosition][yStartPosition] = queen;
      expect(board.validateMovement(xStartPosition, yStartPosition, boardEnd, yStartPosition)).toBeTrue();
    });

    it('should be able to move vertically', () => {

      board.chessBoard[xStartPosition][yStartPosition] = queen;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition, boardStart)).toBeTrue();
    });

    it('should be able to move diagonally', () => {
   
      let diag = xStartPosition > yStartPosition ? xStartPosition - 1 : yStartPosition - 1;
      board.chessBoard[xStartPosition][yStartPosition] = queen;
      expect(board.validateMovement(xStartPosition, xStartPosition, xStartPosition - diag, yStartPosition - diag)).toBeTrue();
    });

    it('should be able to capture an opposing piece', () => {
  
      queen.setColor('WHITE');
      otherPiece.setColor('BLACK');
      board.chessBoard[xStartPosition][yStartPosition] = queen;
      board.chessBoard[xStartPosition + 1][yStartPosition] = otherPiece;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition + 1, yStartPosition)).toBeTrue();
    });

    it('should not be able to capture a piece with the same color', () => {

      queen.setColor('WHITE');
      otherPiece.setColor('WHITE');
      board.chessBoard[xStartPosition][yStartPosition] = queen;
      board.chessBoard[xStartPosition + 1][yStartPosition + 1] = otherPiece;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition + 1, yStartPosition + 1)).toBeFalse();
    });
  });

  describe('Kings', function() {
    let king: King = new King("BLACK");
    let otherPiece: Pawn = new Pawn("WHITE");

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

    it('should not be able to capture a piece with the same color', () => {
      king.setColor('WHITE');
      otherPiece.setColor('WHITE');
      board.chessBoard[xStartPosition][yStartPosition] = king;
      board.chessBoard[xStartPosition + 1][yStartPosition + 1] = otherPiece;
      expect(board.validateMovement(xStartPosition, yStartPosition, xStartPosition + 1, yStartPosition + 1)).toBeFalse();
    });
  });
});
