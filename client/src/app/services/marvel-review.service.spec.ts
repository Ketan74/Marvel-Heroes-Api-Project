import { TestBed } from '@angular/core/testing';

import { MarvelReviewService } from './marvel-review.service';

describe('MarvelReviewService', () => {
  let service: MarvelReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarvelReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
