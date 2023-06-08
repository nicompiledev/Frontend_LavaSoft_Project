import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressTableComponent } from './in-progress-table.component';

describe('InProgressTableComponent', () => {
  let component: InProgressTableComponent;
  let fixture: ComponentFixture<InProgressTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InProgressTableComponent]
    });
    fixture = TestBed.createComponent(InProgressTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
