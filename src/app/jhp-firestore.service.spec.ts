import { TestBed } from '@angular/core/testing';

import { JhpFirestoreService } from './jhp-firestore.service';

describe('JhpFirestoreService', () => {
  let service: JhpFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JhpFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
