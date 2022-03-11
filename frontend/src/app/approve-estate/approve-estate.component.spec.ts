import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveEstateComponent } from './approve-estate.component';

describe('ApproveEstateComponent', () => {
  let component: ApproveEstateComponent;
  let fixture: ComponentFixture<ApproveEstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveEstateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
