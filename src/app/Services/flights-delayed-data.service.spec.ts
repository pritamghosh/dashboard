import { TestBed, inject } from '@angular/core/testing';

import { FlightsDelayedDataService } from './flights-delayed-data.service';

describe('FlightsDelayedDataServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlightsDelayedDataService]
    });
  });

  it('should be created', inject([FlightsDelayedDataService], (service: FlightsDelayedDataService) => {
    expect(service).toBeTruthy();
  }));
});
