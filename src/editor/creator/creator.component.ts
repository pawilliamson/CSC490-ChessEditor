import { Component, OnInit } from '@angular/core';
import {
	DragDropModule,moveItemInArray, transferArrayItem, copyArrayItem, CdkDragStart,CdkDragDrop
	} from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {
  pieceCollection:Array<string> = ["P", "N", "B", "R", "Q", "K", "p", "n", "b", "r", "q", "k"];
	primaryColor : string = "bg-primary";
	secondaryColor: string = "bg-secondary";
	pieceToAdd: string | unknown;
	colorToAdd: string | unknown;
	
    pieces = [
        {piece: "P", limit: 8},
        {piece: "N", limit: 2},
        {piece: "B", limit: 2},
        {piece: "R", limit: 2},
        {piece: "Q", limit: 1},
        {piece: "K", limit: 1},
        {piece: "p", limit: 8},
        {piece: "n", limit: 2},
        {piece: "b", limit: 2},
        {piece: "r", limit: 2},
        {piece: "q", limit: 1},
        {piece: "k", limit: 1}];
	
    dragStarted (event : CdkDragStart) {
        console.log(event);
    }

	drop(event: CdkDragDrop<string[]>) {
		
        if (event.container.id == "otherList" && event.previousContainer.id  != "otherList") {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
            let pieceStr = event.item.element.nativeElement.attributes[6].value;
            let cellID = event.previousContainer.element.nativeElement.id;
            let cellNum = Number.parseInt (cellID.replace ("cdk-drop-list-", ""));
            let row = Math.floor (cellNum / 8);
            let col = cellNum % 8;

         
        }
        else {
            if (event.previousContainer === event.container) {
                moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            } else {
                transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
            }
        }
		
	}
  constructor() { }

  ngOnInit(): void {
  }
	startEditor(){
	        let editor = <HTMLInputElement>document.getElementById("editorTools");
		editor.style.display = "block";
	}

	addPiece(color: string){
		
	}

	saveBoard(){
        let editor = <HTMLInputElement>document.getElementById("editorTools");
		editor.style.display = "none";
	}

	setNewPiece(pieceType: string){
		this.pieceToAdd = pieceType;
	}

	setNewColor(color: string){
		this.colorToAdd = color;
	}

}
