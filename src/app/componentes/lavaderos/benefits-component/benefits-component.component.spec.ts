import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsComponentComponent } from './benefits-component.component';

describe('BenefitsComponentComponent', () => {
  let component: BenefitsComponentComponent;
  let fixture: ComponentFixture<BenefitsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BenefitsComponentComponent]
    });
    fixture = TestBed.createComponent(BenefitsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
