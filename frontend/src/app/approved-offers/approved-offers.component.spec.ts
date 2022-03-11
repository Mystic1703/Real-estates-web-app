import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedOffersComponent } from './approved-offers.component';

describe('ApprovedOffersComponent', () => {
  let component: ApprovedOffersComponent;
  let fixture: ComponentFixture<ApprovedOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
