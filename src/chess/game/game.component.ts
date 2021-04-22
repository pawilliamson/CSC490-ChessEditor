// File: game.component.ts
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Turn } from './turn';
import { ValidatorBoard , Piece} from '../../validator/validator.module';
import { BoardComponent } from '../board/board.component';
@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.css']
})
export class GameComponent implements AfterViewInit {

	history:Array<string> = [""];
	player:boolean = true;
	turn:number = 1;
	@ViewChild('board')
	board:any;
	startingPosition:string = "";
	vboard:ValidatorBoard = new ValidatorBoard();
	previousBoard:any = new BoardComponent();
	halfMove:number = 0;

	constructor() { }

	ngAfterViewInit(): void {
		console.log("TEST");
		this.board.madeMove = (x:any) => {this.move(x)};
		this.board.generateBoard();
		this.startingPosition = this.getFENBoard();


		this.vboard = new ValidatorBoard();
		this.loadValidator();
		console.log(this.startingPosition);

		this.history[0] =this.startingPosition;
		console.log(this.history);
	}
	isUpperCase(st:string){
	return st === st.toUpperCase();
	}

	intToUnary(num:number){
	var out = [1];
		for (var counter = 1; counter < num; counter++){
		 out.push(1);
		}
		return out;
	}
	move(inp:any){
		let spit = (x:string) => { return x.split("/")};

		this.previousBoard.generateBoard(this.history[this.turn-1]);
		
		let icase = this.isUpperCase(this.board.rows[inp.y].cells[inp.x].getPieces());
		if (icase != this.player){
			this.undo();
			return;		
		
		}
		
				let found = false;
		let original = {x: -1, y:-1};
		let cload = (px:number, py:number) => { return {x: px, y: py}};
		let  end = cload(inp.x, inp.y);
		console.log(end);
		
		for (let row = 0; row < this.previousBoard.rows.length && !found; row++){
			for (let cell =0; cell <  this.previousBoard.rows[row].cells.length && !found; cell++){
				if(!((inp.x == cell) && (inp.y == row))) {

					if(this.previousBoard.rows[row].cells[cell].getPieces()
						!= this.board.rows[row].cells[cell].getPieces() && (this.board.rows[row].cells[cell].getPieces() || this.previousBoard.rows[row].cells[cell].getPieces())){
						found = true;
						original = cload(cell, row);
						console.log(original);
						console.log(this.previousBoard.rows[row].cells[cell].getPieces());
						console.log(this.board.rows[row].cells[cell].getPieces())
					}
				}

			}

		}
				if(found){
					let valid = this.vboard.validateMovement(original.x, original.y, end.x, end.y);
					if(!valid){
						this.undo();
					}else{
console.log("VALID");
						this.player=!this.player;
						this.history.push(this.getFENBoard());
						this.turn = this.turn + 1;
						
						this.loadValidator();
					}
					found = false;
					this.previousBoard.generateBoard(this.history[this.turn-1]);
					
				}else{
					this.undo();
				}
			}
			isDigit(fen:string){
				return !isNaN(Number(fen));
			}
			parse(fen:string){
				// TODO Split String into parts

				// TODO Add conditional for only position
				// TODO Parse parts of FEN string
			}

			isValid(){
				// TODO Add Validator Board implementation

			}
			loadValidator(){
			 this.vboard = new ValidatorBoard();
			 for(var row of this.board.rows){
				 for(var cell of row.cells){
					 if(cell.toFENString != ""){
						 let temp = this.vboard.createPiece(cell.toFENString());
						 if(temp instanceof Piece)
						 this.vboard.add(cell.x, cell.y, temp);

					 }
				 }
			 }
			 console.log(this.vboard.chessBoard);
			}

			isCheck(){

			}
			isCheckMate(){

			}
			/** 
			 * Function: endGame
			 *
			 */
			endGame(){

			}

			/**
			 * Function: isMoveLimit
			 */
			isMoveLimit(){
				return this.halfMove >= 100;
			}
			/**
			 * Function: undo
			 * TODO
			 */
			undo(){
				this.board.generateBoard(this.history[this.turn-1]);
				this.loadValidator();
			}
			canCastle(){

			}
			toFENString(){
				return "";
			}
			getFENBoard(){
				return this.board.toFENString();
			}
			// Function nextTurn
			nextTurn(){
				this.history.push(this.toFENString());
				this.player = !this.player;
				this.turn = this.turn + 1;
			}
			// Function:isTurn
			isTurn(player:string){
				return this.player?player=='w':player=='b';
			}

			lastTurn(){
				if(this.turn > 1){
					this.board.generateFEN(this.history.pop());
					this.player = !this.player;
					this.turn = this.turn -1;
				}else{
				 this.board.generateFEN(this.history[0]);
					this.player = true; 

				}
			}

}
export class RCell{
	public value:string|number|undefined = "-1";
	public  stack:any = "";
	constructor(){};
}
