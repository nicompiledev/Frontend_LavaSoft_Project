import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterReserveComponent } from './register-reserve.component';

describe('RegisterReserveComponent', () => {
  let component: RegisterReserveComponent;
  let fixture: ComponentFixture<RegisterReserveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterReserveComponent]
    });
    fixture = TestBed.createComponent(RegisterReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
