import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftDrinksComponent } from './soft-drinks.component';

describe('SoftDrinksComponent', () => {
  let component: SoftDrinksComponent;
  let fixture: ComponentFixture<SoftDrinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftDrinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftDrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
