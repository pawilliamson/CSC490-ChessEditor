// File: game.component.ts
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Turn } from './turn';
import { ValidatorBoard , Piece} from '../../validator/validator.module';
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
	move(inp:any){
		let spit = (x:string) => { return x.split("/")};
		let previous = spit(this.history[this.turn-1]);
		let leMove = spit(this.getFENBoard());
		this.loadValidator();
		let found = false;
		let original = {x: -1, y:-1};
		let cload = (px:number, py:number) => { return {x: px, y: py}};
		let  end = cload(inp.x, inp.y);
		console.log(leMove);
		console.log(inp.x + ", " +inp.y);
		console.log(leMove[inp.y]);
		if(this.player && !this.isUpperCase(this.board.rows[inp.y].cells[inp.x].getPieces()) || !this.player && this.isUpperCase(this.board.rows[inp.y].cells[inp.x].getPieces())){
			console.log("THAT IS NOT YOURS!");
			this.undo();
			return;
		}
		for (var row = 0; row <= 7 && found == false; row++){
			const pRow = previous[row];
			const leRow = leMove[row];
			let counter = 0;
			let counters = {p: 0, l: 0, pe: 0, le: 0};
			while(counter <= 7 && found == false){
				const pCell = counters.pe == 0?pRow[counters.p]:"1";
				const leCell = counters.le == 0? leRow[counters.l]:"1";
				console.log(pCell);
				console.log(leCell);
				if(pCell == leCell){
					counters.p = counters.p+1;
					counters.l = counters.l+1;
				}
				if(pCell != leCell && !this.isDigit(pCell) && this.isDigit(leCell)){
					found = true;
					original.x = counter;
					original.y = row;
				}
				counter = counter + 1;
			}
		}

				if(found){
					console.log(previous);
					console.log(leMove);
					console.log(original);
					console.log(end);
					let valid = this.vboard.validateMovement(original.x,7- original.y,end.x, 7-end.y);
					if(!valid){
						this.undo();
					}else{

						this.player=!this.player;
						this.history.push(this.getFENBoard());
						this.turn = this.turn + 1;
					}
					found = false;
					
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
				let aboard = this.getFENBoard().split("/");

				for(var y = 0; y < aboard.length; y++){
					for(var x = 0; x < aboard[y].length; x++){
						
						let temp = aboard[y][x];
						if(this.isDigit(temp)){
							let counter = 0;
							while(counter < Number(temp)){
								counter = counter + 1;
								this.vboard.chessBoard[y][x+counter] = new Piece("UNSPECIFIED");
							}
						}else{
							let temp2 = this.vboard.createPiece(temp);
							if(temp2 instanceof Piece){
								this.vboard.chessBoard[7-y][x] = temp2 ;
							}
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
