import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCarwashComponent } from './register-carwash.component';

describe('RegisterCarwashComponent', () => {
  let component: RegisterCarwashComponent;
  let fixture: ComponentFixture<RegisterCarwashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterCarwashComponent]
    });
    fixture = TestBed.createComponent(RegisterCarwashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
