import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCarwashComponent } from './data-carwash.component';

describe('DataCarwashComponent', () => {
  let component: DataCarwashComponent;
  let fixture: ComponentFixture<DataCarwashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataCarwashComponent]
    });
    fixture = TestBed.createComponent(DataCarwashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
