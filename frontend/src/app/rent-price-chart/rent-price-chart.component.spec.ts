import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentPriceChartComponent } from './rent-price-chart.component';

describe('RentPriceChartComponent', () => {
  let component: RentPriceChartComponent;
  let fixture: ComponentFixture<RentPriceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentPriceChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentPriceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
