import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationManagementComponent } from './registration-management.component';

describe('RegistrationManagementComponent', () => {
  let component: RegistrationManagementComponent;
  let fixture: ComponentFixture<RegistrationManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
