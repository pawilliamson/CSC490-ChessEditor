/* File: board.component.spec.ts
	File containing tests for Board Component.
*/

//import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from "./board.component";

describe("BoardComponent", () => {
  let component = new BoardComponent();
  //let fixture = new ComponentFixture<BoardComponent>;

  /*beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ BoardComponent ]
      })
      .compileComponents();
    }); 
    beforeEach(() => {
      fixture = TestBed.createComponent(BoardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });*/

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
