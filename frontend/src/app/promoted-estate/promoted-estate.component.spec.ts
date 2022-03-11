import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotedEstateComponent } from './promoted-estate.component';

describe('PromotedEstateComponent', () => {
  let component: PromotedEstateComponent;
  let fixture: ComponentFixture<PromotedEstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotedEstateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotedEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
