import { TestBed, inject } from '@angular/core/testing';

import { PassengerDataService } from './passenger-data.service';

describe('PassengerDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassengerDataService]
    });
  });

  it('should be created', inject([PassengerDataService], (service: PassengerDataService) => {
    expect(service).toBeTruthy();
  }));
});
