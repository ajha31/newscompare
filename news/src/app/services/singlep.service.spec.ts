import { TestBed } from '@angular/core/testing';

import { SinglepService } from './singlep.service';

describe('SinglepService', () => {
  let service: SinglepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinglepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
