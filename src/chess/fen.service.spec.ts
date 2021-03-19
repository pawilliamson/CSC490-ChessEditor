import { TestBed } from '@angular/core/testing';

import { FenService } from './fen.service';

describe('FenService', () => {
  let service: FenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
