import { TestBed } from '@angular/core/testing';

import { DeparatamentosService } from './deparatamentos.service';

describe('DeparatamentosService', () => {
  let service: DeparatamentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeparatamentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
