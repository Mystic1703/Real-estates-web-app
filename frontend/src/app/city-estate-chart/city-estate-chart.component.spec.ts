import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityEstateChartComponent } from './city-estate-chart.component';

describe('CityEstateChartComponent', () => {
  let component: CityEstateChartComponent;
  let fixture: ComponentFixture<CityEstateChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityEstateChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityEstateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
