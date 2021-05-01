// File: board.component.ts
import { FEN } from '../fen';
import { PieceComponent } from '../piece/piece.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem,
  CdkDragStart,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})

/**
 * Class: BoardComponent
 * Implements: OnInit, FEN
 *
 * Structure for chessboard
 *
 *
 */
export class BoardComponent implements OnInit, FEN {
  primaryColor = 'bg-primary';
  secondaryColor = 'bg-secondary';
  pieceToAdd: string | unknown;
  colorToAdd: string | unknown;
  noStack = false;
  rows: Array<Row> = [];

  /**
   * Function: constructor
   *
   */
  constructor() {}
  public madeMove = (cell: any) => cell;

  /*
   * Function: addRow
   *
   * Returns a row with cells having alternating style classes.
   *
   */
  addRow(classA: string, classB: string, fen: string) {
    const cells = 8;
    let y = 0;
    const temp: Row = new Row();
    let counter = 0;
    let counter2 = 0;
    for (; y < cells; y++) {
      const fs = fen.charAt(counter);
      if (!isNaN(Number(fs))) {
        if (counter2 === 0) {
          counter2++;
        }
        if (counter2 === Number(fs)) {
          counter2 = 0;
          counter++;
        } else {
          counter2++;
        }
      } else {
        counter++;
      }
      const a = new Cell();
      if (y % 2 === 0) {
        a.style = classA;
      } else {
        a.style = classB;
      }
      a.setFEN(isNaN(Number(fs)) ? fs : '');
      a.y = this.rows.length;
      a.x = y;
      if (!(this.madeMove === null)) {
        a.madeMove = () => {
          this.madeMove(a);
        };
      }

      temp.addCell(a);
    }

    return temp;
  }

  /**
   * Function: move()
   * Parameters: x1, y1, x2, y2
   *
   * Moves piece from cell defined by (x1, y1) to cell defined
   * by (x2, y2).
   */
  move(x1: number, y1: number, x2: number, y2: number) {
    const temp = this.rows[y1].cells[x1].toFENString();
    this.rows[y1].cells[x1].setFEN('');
    this.rows[y2].cells[x2].setFEN(temp);
  }

  /**
   * Function: generateBoard()
   *
   * Parameters:
   *
   * - classA:string
   * - classB:string
   *
   * Creates the chessboard with alternating rows.
   */
  generateBoard(startingPos?: Partial<string>) {
    this.rows = [];
    if (!startingPos) {
      startingPos = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
    }
    const num = 8;
    let counter = 0;
    const fen = startingPos.split('/');
    for (; counter < num; counter++) {
      if (counter % 2 === 0) {
        this.rows.push(
          this.addRow(this.primaryColor, this.secondaryColor, fen[counter])
        );
      } else {
        this.rows.push(
          this.addRow(this.secondaryColor, this.primaryColor, fen[counter])
        );
      }
    }
  }

  /**
   * Function: toFENString()
   *
   * Returns the position of all pieces in a FEN string.
   */
  toFENString() {
    let i = 0;
    const j = 0;
    const length = 8;
    let output = '';

    for (; i < length; i++) {
      output += this.rows[i].toFENString() + (i + 1 === length ? '' : '/');
    }
    return output;
  }

  /**
   * Function: ngOnInit
   */
  ngOnInit(): void {
    this.generateBoard('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
  }
}

/**
 * Class: Row
 *
 * Structure for rows.
 */
class Row implements FEN {
  cells: Array<Cell> = [];

  /**
   * Function: constructor
   */
  constructor() {}
  toFENString() {
    let out = '';
    let i = 0;
    let counter = 0;
    for (; i < this.cells.length; i++) {
      const z = this.cells[i].toFENString();
      if (z === '' || z === null || !z) {
        counter += 1;
      } else {
        if (counter > 0) {
          out = out.concat(counter.toString());
          counter = 0;
        }
        out = out.concat(z.toString());
      }
    }
    if (counter > 0) {
      return out.concat(counter.toString());
    }
    return out;
  }

  /**
   * Function: getCell()
   *
   * Parameters:
   * - pos: number - position in rows
   *
   * Returns the cell if found, else returns -1.
   **/
  getCell(pos: number) {
    if (this.cells.length < pos || pos < 0) {
      return -1;
    }
    return this.cells[pos];
  }

  /**
   * Function: addCell
   *
   * Parameters:
   *
   * - cell
   */
  addCell(cell: Cell) {
    this.cells.push(cell);
  }
}
class Cell implements FEN {
  style = '';
  pieces: Array<string> = [''];
  x = -1;
  y = -1;
  /**
   * Function: constructor
   *
   */
  constructor() {}
  public madeMove = () => {};
  /**
   * Function: getPieces
   *
   * Returns first character in the pieces array
   */
  getPieces() {
    return this.pieces[0];
  }

  /**
   * Function: getPiece()
   *
   * Returns PieceComponent
   */
  getPiece() {
    return this.pieces[0];
  }
  /**
   * Function: toFENString()
   *
   * Returns FEN String of cell
   */
  toFENString() {
    return this.pieces[0];
  }

  /**
   * Function: drop
   */
  drop(event: CdkDragDrop<string[]>) {
    const before = this.getPieces();
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    //if(this.pieces.length > 1)
    if (before && this.getPieces()) {
      if (before === this.getPieces()) {
        this.pieces.shift();
      } else {
        this.pieces.pop();
      }
    }

    this.pieces = [this.getPieces()];
    if (event.previousContainer.id !== 'otherList') {
      this.madeMove();
    } else {
      this.madeMove();
    }
  }

  /**
   * Function: setFEN
   *
   */
  setFEN(fen: string) {
    this.pieces[0] = fen;
  }

  /*
   * Function: getStyle
   *
   * Returns a string containing the cell's style.
   *
   */
  getStyle() {
    return 'col ' + this.style;
  }
}
