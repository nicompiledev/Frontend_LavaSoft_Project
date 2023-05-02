import { TestBed } from '@angular/core/testing';

import { ModalReserveService } from './modal-reserve.service';

describe('ModalReserveService', () => {
  let service: ModalReserveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalReserveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
