import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpicyChipsComponent } from './spicy-chips.component';

describe('SpicyChipsComponent', () => {
  let component: SpicyChipsComponent;
  let fixture: ComponentFixture<SpicyChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpicyChipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpicyChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
