import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesCarwashComponent } from './services-carwash.component';

describe('ServicesCarwashComponent', () => {
  let component: ServicesCarwashComponent;
  let fixture: ComponentFixture<ServicesCarwashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesCarwashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesCarwashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
