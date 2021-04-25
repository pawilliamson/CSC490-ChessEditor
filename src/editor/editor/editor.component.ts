import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import {
	DragDropModule,moveItemInArray, transferArrayItem, copyArrayItem,
	CdkDragStart,CdkDragDrop, CdkDrag, CdkDropList, CdkDragExit,CdkDragMove
} from '@angular/cdk/drag-drop';

import {BoardComponent} from '../../chess/board/board.component';
@Component({
	selector: 'app-creator',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.css']
})

export class CreatorComponent implements AfterViewInit, AfterContentInit {
	@ViewChild('game')board: any;


	closed = true;

	pieceCollection: Array<string> = [];
	primaryColor = 'bg-primary';
	secondaryColor = 'bg-secondary';
	pieceToAdd: string | unknown;
	colorToAdd: string | unknown;
	fenSaved: Array<string>=[];
	previousFen = '';

	/* each piece will contain a map of attributes piece: FEN string
	 * representation of piece limit: used to track the number of pieces
	 * allowed to be placed on the board.  upperBound: maximum number of pieces
	 * that can be allowed on the board.
	 */
	pieces = [
		{piece: 'P', limit: 8, upperBound: 8},
		{piece: 'N', limit: 2, upperBound: 2},
		{piece: 'B', limit: 2, upperBound: 2},
		{piece: 'R', limit: 2, upperBound: 2},
		{piece: 'Q', limit: 1, upperBound: 1},
		{piece: 'K', limit: 1, upperBound: 1},
		{piece: 'p', limit: 8, upperBound: 8},
		{piece: 'n', limit: 2, upperBound: 2},
		{piece: 'b', limit: 2, upperBound: 2},
		{piece: 'r', limit: 2, upperBound: 2},
		{piece: 'q', limit: 1, upperBound: 1},
		{piece: 'k', limit: 1, upperBound: 1}];
	constructor() { }

	getLimit(piece: string){
		for(const p of this.pieces){
			if (p.piece === piece){
				return p.limit;
			}
		}
		return -1;
	}

	dragStarted(event: CdkDragStart) {
		console.log(event);
	}

	start(piece: string){
		for (const p of this.pieces){
			if(p.piece === piece){
				p.limit--;
				if(p.limit > 0){
					this.pieceCollection.push(piece);
				}
				break;
			}
		}
	}

	end(piece: string){
		for (const p of this.pieces){
			if(p.piece === piece){
				p.limit = p.limit++;
				if(p.limit === 0){
					this.pieceCollection.push(piece);
				}

				this.reorganizeEditorPieces ();
				break;
			}

		}

	}

	drop(event: any) {

		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex,
				event.currentIndex);
		}
		else {
			transferArrayItem(event.previousContainer.data,
				event.container.data, event.previousIndex,
				event.currentIndex);
		}

		let p = 0;
		for (; p < this.pieceCollection.length; p++){
			while(this.pieceCollection.filter((x)=> x===
				this.pieceCollection[p]).length > 1){
				let z = 0;
				for( ;z < this.pieces.length; z++){
					if (this.pieces[z].piece === this.pieceCollection[p]){
						this.pieces[z].limit = this.pieces[z].limit + 1;
					}
				}

				this.pieceCollection.splice(p, 1);
			}
		}
		this.checkLimits();
	}


	/* reorganizeEditorPieces - used to restore ordering of pieces based on
	 * ordering of piece map.
	 */
	reorganizeEditorPieces(): void {
		this.pieceCollection = [];
		for (const p of this.pieces) {
			this.pieceCollection.push (p.piece);
		}
	}

	ngAfterViewInit(): void {
		this.board.madeMove = (cell: any) => {this.checkLimits();};
	}

	ngAfterContentInit(): void {
		this.reorganizeEditorPieces ();
	}

	checkLimits(){
		const pieces = this.pieces;
		const str: string = this.board.toFENString();
		for(const piece of this.pieces){
			const ls = Number(str.length);
			const reg = new RegExp(piece.piece, 'g');
			const rs = str.replace(reg, '').length;
			const num: number = Number(ls) - Number(rs);
			console.log(str.replace(piece.piece, ''));
			console.log(str.length);


			console.log(str.replace(/piece.piece/g, ''));
			console.log(num);
			piece.limit = piece.upperBound - num;

		}
	}

	startEditor(){
		this.closed = false;
		this.previousFen = this.board.board.toFENString ();
		this.board.initBoard('8/8/8/8/8/8/8/8');
	}

	cancelEditor() {
		this.closed = true;
		this.board.initBoard (this.previousFen);
		this.closeEditor ();
	}

	closeEditor(){
                this.closed = true;
		for(const piece of this.pieces){
			piece.limit = piece.upperBound;
		}
	}

	loadSavedFen(fen: string){
		this.closeEditor ();
		this.board.initBoard (fen);
	}


	saveBoard(){
		const fen: string = this.board.board.toFENString();
		if (fen.match('.*K.*') === null || fen.match ('.*k.*') === null) {
			window.alert ('A valid chess board layout has at least one king for each player');
		}
		else {
			if(this.fenSaved.indexOf(fen) === -1)
			{this.fenSaved.push(fen);}

			this.loadSavedFen (fen);
		}
	}

	setNewPiece(pieceType: string){
		this.pieceToAdd = pieceType;
	}

	setNewColor(color: string){
		this.colorToAdd = color;
	}

}
