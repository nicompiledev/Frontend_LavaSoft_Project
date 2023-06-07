import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileCarwashComponent } from './edit-profile-carwash.component';

describe('EditProfileCarwashComponent', () => {
  let component: EditProfileCarwashComponent;
  let fixture: ComponentFixture<EditProfileCarwashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfileCarwashComponent]
    });
    fixture = TestBed.createComponent(EditProfileCarwashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
