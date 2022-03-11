import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPriceChartComponent } from './buy-price-chart.component';

describe('BuyPriceChartComponent', () => {
  let component: BuyPriceChartComponent;
  let fixture: ComponentFixture<BuyPriceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyPriceChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyPriceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
