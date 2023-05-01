import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCarwashComponent } from './profile-carwash.component';

describe('ProfileCarwashComponent', () => {
  let component: ProfileCarwashComponent;
  let fixture: ComponentFixture<ProfileCarwashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCarwashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCarwashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
