import { Component, OnInit } from '@angular/core';
import { Types } from "./types.enum"
@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {
  type:Types = Types.BlackPawn;

  constructor() { }

  ngOnInit(): void {
  }

}
