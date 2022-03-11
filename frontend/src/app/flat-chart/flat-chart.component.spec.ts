import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatChartComponent } from './flat-chart.component';

describe('FlatChartComponent', () => {
  let component: FlatChartComponent;
  let fixture: ComponentFixture<FlatChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlatChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
