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
		this.board.madeMove = () => this.move();
		this.board.generateBoard();
		this.startingPosition = this.getFENBoard();
		
		
		this.vboard = new ValidatorBoard();
		this.loadValidator();
	}
	move(){
	console.log("MOVE CALLED");
		let after = this.getFENBoard();
		let previous = (this.turn > 1? this.history[this.turn - 1]:this.startingPosition).split("/");
		let aboard = after.split("/");
		let pos1 = {x: -1, y: -1};
		let pos2 = {x: -1, y: -1};
		let found = false;
		for(var y = 0; y < aboard.length && !found; y = y + 1){
		let counter = 0;
		for(var x = 0; x < aboard[y].length && !found; x = x + 1){
		let out = Number(aboard[y][x]);
				counter = isNaN(out)? counter:counter+(out > 1? out-1:0);
			if(!(aboard[y][x] == previous[y][x])){
			  let out = Number(aboard[y][x]);
				if(pos1.x != -1 && isNaN(out)){
					console.log(aboard[y][x]);
					pos2.x = x + (counter);
					pos2.y = 7- y;
					if(isNaN(out))
					found = true;
				}else{
					pos1.x = x + (counter);
					pos1.y =  7 - y;
				}	
			}
		}
		}
		if(found){
		console.log(aboard);
		console.log(previous);
		console.log(pos1);
		console.log(pos2);
			console.log(this.vboard.validateMovement(pos1.x,pos1.y,pos2.x,pos2.y));
			found = false;
		}
	}

	parse(){
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
		 let temp = this.vboard.createPiece(aboard[y][x]);
		 if(temp instanceof Piece)
		 this.vboard.chessBoard[7-y][x] = temp;
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
		this.board.generateBoard(this.startingPosition);
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
		}
	}

}
