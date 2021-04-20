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

	}
	move(){

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
