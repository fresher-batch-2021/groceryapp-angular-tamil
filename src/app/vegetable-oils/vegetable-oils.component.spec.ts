import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VegetableOilsComponent } from './vegetable-oils.component';

describe('VegetableOilsComponent', () => {
  let component: VegetableOilsComponent;
  let fixture: ComponentFixture<VegetableOilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VegetableOilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VegetableOilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
