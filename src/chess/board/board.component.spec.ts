/* File: board.component.spec.ts
	File containing tests for Board Component.
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Initialization', function() {
    it('should be defined', () => {
      expect(component).toBeDefined();
    });
  });

  describe('Create Board', function(){
    it('should generate normal chessboard', () => {
      const initial_layout = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
      const result = component.toFENString();
      expect(result).toContain(initial_layout);
    });

    it('should generate an empty chessboard', () => {
      const initialLayout = '8/8/8/8/8/8/8/8';
      component.generateBoard(initialLayout);
      const result = component.toFENString();
      expect(result).toContain(initialLayout);
    });

    it('should generate an empty board with an empty layout', () =>{
      const initialLayout = '';
      component.generateBoard('');
      const result = component.toFENString();
      expect(result).toContain(initialLayout);
    });
  });
});
