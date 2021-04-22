import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
	DragDropModule,moveItemInArray, transferArrayItem, copyArrayItem, CdkDragStart,CdkDragDrop, CdkDrag, CdkDropList, CdkDragExit,CdkDragMove
	} from '@angular/cdk/drag-drop';

import {BoardComponent} from '../../chess/board/board.component';
@Component({
    selector: 'app-creator',
	templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})

export class CreatorComponent implements AfterViewInit {
    @ViewChild("board")board:any;

    CdkDragExit(){
        console.log("test");
    }

    CdkDragStart(event:CdkDrag<string[]>){
        console.log("test");
    }

    pieceCollection:Array<string> = [];
	primaryColor : string = "bg-primary";
	secondaryColor: string = "bg-secondary";
	pieceToAdd: string | unknown;
	colorToAdd: string | unknown;
	fenSaved:Array<string>=[];
    previousFen: string = "";
	
    /*each piece will contain a map of attributes
        piece: FEN string representation of piece
        limit: used to track the number of pieces allowed to be placed on the board.
        upperBound: maximum number of pieces that can be allowed on the board.
    */
    pieces = [
        {piece: "P", limit: 8, upperBound: 8},
        {piece: "N", limit: 2, upperBound: 2},
        {piece: "B", limit: 2, upperBound: 2},
        {piece: "R", limit: 2, upperBound: 2},
        {piece: "Q", limit: 1, upperBound: 1},
        {piece: "K", limit: 1, upperBound: 1},
        {piece: "p", limit: 8, upperBound: 8},
        {piece: "n", limit: 2, upperBound: 2},
        {piece: "b", limit: 2, upperBound: 2},
        {piece: "r", limit: 2, upperBound: 2},
        {piece: "q", limit: 1, upperBound: 1},
        {piece: "k", limit: 1, upperBound: 1}];
	
	getLimit(piece:string){
		for ( let p = 0; p < this.pieces.length; p++){
            if(this.pieces[p].piece == piece){
                return this.pieces[p].limit;
            }
		}
		return -1;
	}
	
    dragStarted (event : CdkDragStart) {
        console.log(event);
    }

    start(piece: string){
        for ( let p = 0; p < this.pieces.length; p++){
            if(this.pieces[p].piece == piece){
                this.pieces[p].limit--;
                
                
                if(this.pieces[p].limit > 0){
                    this.pieceCollection.push(piece);
                }
                break;
            }        
        }        
    }

    end(piece: string){
        for ( let p = 0; p < this.pieces.length; p++){

            if(this.pieces[p].piece == piece){
                this.pieces[p].limit = this.pieces[p].limit++;
                if(this.pieces[p].limit == 0){
                    this.pieceCollection.push(piece);
                }

                this.reorganizeEditorPieces ();
                break;
            }

        }

    }
	
    drop(event: any) {

        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }

        let p = 0;
        for (; p < this.pieceCollection.length; p++){
            while(this.pieceCollection.filter((x)=> x== this.pieceCollection[p]).length > 1){ 
                let z = 0;
                for( ;z < this.pieces.length; z++){
                    if (this.pieces[z].piece == this.pieceCollection[p]){
                        this.pieces[z].limit = this.pieces[z].limit + 1;
                    }
                }

                this.pieceCollection.splice(p, 1);
            }
        }
    }

    constructor() { }

    /*
    reorganizeEditorPieces - used to restore ordering of pieces based on ordering of piece map.
    */
    reorganizeEditorPieces (): void {
        this.pieceCollection = [];
        for (let i = 0; i < this.pieces.length; i++) {
            this.pieceCollection.push (this.pieces [i].piece);
        }
    }

    ngAfterViewInit(): void {
        this.reorganizeEditorPieces ();
    }

    startEditor(){
        let enterBtn = <HTMLInputElement>document.getElementById("enterEditorBtn");
        let editor = <HTMLInputElement>document.getElementById("editorTools");
        let saved = <HTMLInputElement>document.getElementById("load");
        editor.style.display="block";
        saved.style.display="block";
        enterBtn.style.display="none";
        this.board.generateBoard("8/8/8/8/8/8/8/8");
    }

    closeEditor(){
        let enterBtn = <HTMLInputElement>document.getElementById("enterEditorBtn");
        let editor = <HTMLInputElement>document.getElementById("editorTools");
        let saved = <HTMLInputElement>document.getElementById("load");
        editor.style.display= "none";
        saved.style.display="none";
        enterBtn.style.display="block";

        //Reset counts for pieces
        for(let piece of this.pieces){
            let limit = <HTMLInputElement>document.getElementById("pieceLimit_" + piece.piece);
            limit.innerHTML = piece.upperBound.toString();
        }
    }

    loadSavedFen(fen:string){
        this.board.generateBoard(fen);
    }

    showSavedFens(){
        let savedFENS = <HTMLInputElement>document.getElementById("load");
        savedFENS.style.display = "block";
    }

    saveBoard(){
        if(this.fenSaved.indexOf(this.board.toFENString()) == -1)
            this.fenSaved.push(this.board.toFENString());
        this.closeEditor();
    }

	setNewPiece(pieceType: string){
		this.pieceToAdd = pieceType;
	}

	setNewColor(color: string){
		this.colorToAdd = color;
	}

	addPiece(color:string){}
}
