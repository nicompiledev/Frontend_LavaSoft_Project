import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsPacksComponent } from './cards-packs.component';

describe('CardsPacksComponent', () => {
  let component: CardsPacksComponent;
  let fixture: ComponentFixture<CardsPacksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsPacksComponent]
    });
    fixture = TestBed.createComponent(CardsPacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
