import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarLavaderosComponent } from './aceptar-lavaderos.component';

describe('AceptarLavaderosComponent', () => {
  let component: AceptarLavaderosComponent;
  let fixture: ComponentFixture<AceptarLavaderosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AceptarLavaderosComponent]
    });
    fixture = TestBed.createComponent(AceptarLavaderosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
