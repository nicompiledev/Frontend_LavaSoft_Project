import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCompleteComponent } from './filter-complete.component';

describe('FilterCompleteComponent', () => {
  let component: FilterCompleteComponent;
  let fixture: ComponentFixture<FilterCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterCompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
