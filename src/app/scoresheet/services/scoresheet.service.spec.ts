import { TestBed, inject } from '@angular/core/testing';

import { ScoresheetService } from './scoresheet.service';

describe('ScoresheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScoresheetService]
    });
  });

  it('should be created', inject([ScoresheetService], (service: ScoresheetService) => {
    expect(service).toBeTruthy();
  }));
});
