import { TestBed } from '@angular/core/testing';

import { GpxService } from './gpx.service';

describe('MapServiceService', () => {
  let service: GpxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GpxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
