import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTableComponent } from './completed-table.component';

describe('CompletedTableComponent', () => {
  let component: CompletedTableComponent;
  let fixture: ComponentFixture<CompletedTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedTableComponent]
    });
    fixture = TestBed.createComponent(CompletedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
