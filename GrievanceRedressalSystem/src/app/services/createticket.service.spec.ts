import { TestBed } from '@angular/core/testing';

import { CreateticketService } from './createticket.service';

describe('CreateticketService', () => {
  let service: CreateticketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateticketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
