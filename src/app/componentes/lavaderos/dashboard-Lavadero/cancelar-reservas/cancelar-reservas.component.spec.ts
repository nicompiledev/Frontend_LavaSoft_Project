import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarReservasComponent } from './cancelar-reservas.component';

describe('CancelarReservasComponent', () => {
  let component: CancelarReservasComponent;
  let fixture: ComponentFixture<CancelarReservasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelarReservasComponent]
    });
    fixture = TestBed.createComponent(CancelarReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
