import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMonDiscountComponent } from './sub-mon-discount.component';

describe('SubMonDiscountComponent', () => {
  let component: SubMonDiscountComponent;
  let fixture: ComponentFixture<SubMonDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubMonDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubMonDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
