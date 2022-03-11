import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveOfferComponent } from './approve-offer.component';

describe('ApproveOfferComponent', () => {
  let component: ApproveOfferComponent;
  let fixture: ComponentFixture<ApproveOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
