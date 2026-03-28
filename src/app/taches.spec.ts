import { TestBed } from '@angular/core/testing';

import { Taches } from './taches';

describe('Taches', () => {
  let service: Taches;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Taches);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
