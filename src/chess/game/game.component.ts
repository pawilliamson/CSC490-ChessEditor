// File: game.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { Turn } from './turn';
import { ValidatorBoard } from '../../validator/validator.module';
@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

	history:Array<string> = [""];
	player:boolean = true;
	turn:number = 1;
	@ViewChild('board')
	board:any;
	startingPosition:string = "";
	vboard:ValidatorBoard = new ValidatorBoard();

	halfMove:number = 0;

	constructor() { }

	ngOnInit(): void {
		this.board.generateBoard();
		this.board.madeMove = () => this.move();
		this.vboard = new ValidatorBoard();
	}
	move(){
		let after = this.getFENBoard();
		let previous = this.history[this.turn - 1];
		let aboard = after.split("/");
		let pos1 = {x: -1, y: -1};
		let pos2 = {x: -1, y: -1};
		let found = false;
		for(var y = 0; y < aboard.length && !found; y++){
		for(var x = 0; x < aboard[y].length && !found; x++){
			if(aboard[y][x] != previous[y][x]){
				if(pos1.x != -1){
					pos2.x = x;
					pos2.y = y;
					found = true;
				}else{
					pos1.x = x;
					pos1.y = y;
				}
			}
		}
		}
		if(found){
			if( !this.vboard.validateMovement(pos1.x, pos1.y ,
				pos2.x, pos2.y)){
				this.undo();
				// TODO Add Message or error
			}
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
