import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBasicComponent } from './filter-basic.component';

describe('FilterBasicComponent', () => {
  let component: FilterBasicComponent;
  let fixture: ComponentFixture<FilterBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
