// File: game.component.ts
import { Component, AfterViewInit, ViewChild } from "@angular/core";
import { Turn } from "./turn";
import { ValidatorBoard, Piece } from "../../validator/validator.module";
import { BoardComponent } from "../board/board.component";
@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"],
})
export class GameComponent implements AfterViewInit {
  @ViewChild("board")
  board: any;
  history: Array<string> = [""];
  player = true;
  turn = 1;
  startingPosition = "";
  vboard: ValidatorBoard = new ValidatorBoard();
  previousBoard: any = new BoardComponent();
  halfMove = 0;

  constructor() {}

  ngAfterViewInit(): void {
    this.initBoard();
  }

  initBoard(starter?: Partial<string>) {
    this.turn = 1;
    this.board.madeMove = (x: any) => {
      this.move(x);
    };

    if (!starter) {
      this.board.generateBoard();
    } else {
      this.board.generateBoard(starter);
    }

    this.startingPosition = this.getFENBoard();
    this.vboard = new ValidatorBoard();
    this.loadValidator();

    //this.history[0] = this.startingPosition;
    this.history = [];
    this.history.push(this.startingPosition);
  }

  isUpperCase(st: string) {
    //if st is undefined (happens when dragging piece back to its original
    //position), always return the boolean that contadicts what is
    //stored in player.
    return typeof st != "undefined" ? st === st.toUpperCase() : !this.player;
  }

  intToUnary(num: number) {
    const out = [1];
    for (let counter = 1; counter < num; counter++) {
      out.push(1);
    }
    return out;
  }
  move(inp: any) {
    const spit = (x: string) => x.split("/");

    this.previousBoard.generateBoard(this.history[this.turn - 1]);

    const icase = this.isUpperCase(
      this.board.rows[inp.y].cells[inp.x].getPieces()
    );
    if (icase !== this.player) {
      this.undo();
      return;
    }

    let found = false;
    let original = { x: -1, y: -1 };
    const cload = (px: number, py: number) => ({ x: px, y: py });
    const end = cload(inp.x, inp.y);
    console.log(end);

    for (let row = 0; row < this.previousBoard.rows.length && !found; row++) {
      for (
        let cell = 0;
        cell < this.previousBoard.rows[row].cells.length && !found;
        cell++
      ) {
        if (!(inp.x === cell && inp.y === row)) {
          if (
            this.previousBoard.rows[row].cells[cell].getPieces() !==
              this.board.rows[row].cells[cell].getPieces() &&
            (this.board.rows[row].cells[cell].getPieces() ||
              this.previousBoard.rows[row].cells[cell].getPieces())
          ) {
            found = true;
            original = cload(cell, row);
            console.log(original);
            console.log(this.previousBoard.rows[row].cells[cell].getPieces());
            console.log(this.board.rows[row].cells[cell].getPieces());
          }
        }
      }
    }
    if (found) {
      const valid = this.vboard.validateMovement(
        original.x,
        original.y,
        end.x,
        end.y
      );
      if (!valid) {
        this.undo();
      } else {
        console.log("VALID");
        this.player = !this.player;
        this.history.push(this.getFENBoard());
        this.turn = this.turn + 1;

        this.loadValidator();
      }
      found = false;
      this.previousBoard.generateBoard(this.history[this.turn - 1]);
    } else {
      this.undo();
    }
  }
  isDigit(fen: string) {
    return !isNaN(Number(fen));
  }
  parse(fen: string) {
    // TODO Split String into parts
    // TODO Add conditional for only position
    // TODO Parse parts of FEN string
  }

  isValid() {
    // TODO Add Validator Board implementation
  }
  loadValidator() {
    this.vboard = new ValidatorBoard();
    for (const row of this.board.rows) {
      for (const cell of row.cells) {
        if (cell.toFENString !== "") {
          const temp = this.vboard.createPiece(cell.toFENString());
          if (temp instanceof Piece) {
            this.vboard.add(cell.x, cell.y, temp);
          }
        }
      }
    }
    console.log(this.vboard.chessBoard);
  }
  // Function: isCheck
  // Checks if the current player is in check.
  isCheck() {}
  // Funciton: isCheckMate
  // Checks if a checkmate exists
  isCheckMate() {}
  /**
   * Function: endGame
   *
   */
  endGame() {}

  /**
   * Function: isMoveLimit
   */
  isMoveLimit() {
    return this.halfMove >= 100;
  }
  /**
   * Function: undo
   * TODO
   */
  undo() {
    this.board.generateBoard(this.history[this.turn - 1]);
    this.loadValidator();
  }
  canCastle() {}
  enPassant() {}
  enPassantToString() {
    return "-";
  }
  turnToString() {
    return this.turn.toString();
  }
  halfMoveToString() {
    return "-";
  }
  castleToString() {
    return "-";
  }
  // Function: toFENString()
  // Used to export the board to a FEN string
  toFENString() {
    return (
      this.getFENBoard() +
      " " +
      this.playerToString +
      " " +
      this.castleToString() +
      this.enPassantToString() +
      this.halfMoveToString() +
      this.turnToString()
    );
  }
  getFENBoard() {
    return this.board.toFENString();
  }
  // Function nextTurn
  nextTurn() {
    this.history.push(this.toFENString());
    this.player = !this.player;
    this.turn = this.turn + 1;
  }
  // Function:isTurn
  // Checks if it is the given player's turn.
  // Note: This can be used for the full FEN string
  isTurn(player: string) {
    return this.player ? player === "w" : player === "b";
  }
  playerToString() {
    return this.player ? "w" : "b";
  }

  lastTurn() {
    if (this.turn > 1) {
      this.board.generateFEN(this.history.pop());
      this.player = !this.player;
      this.turn = this.turn - 1;
    } else {
      this.board.generateFEN(this.history[0]);
      this.player = true;
    }
  }
}
export class RCell {
  public value: string | number | undefined = "-1";
  public stack: any = "";
  constructor() {}
}
