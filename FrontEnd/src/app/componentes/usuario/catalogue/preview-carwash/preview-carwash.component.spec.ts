import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCarwashComponent } from './preview-carwash.component';

describe('PreviewCarwashComponent', () => {
  let component: PreviewCarwashComponent;
  let fixture: ComponentFixture<PreviewCarwashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewCarwashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewCarwashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
