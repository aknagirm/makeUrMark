import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderHistComponent } from './view-order-hist.component';

describe('ViewOrderHistComponent', () => {
  let component: ViewOrderHistComponent;
  let fixture: ComponentFixture<ViewOrderHistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrderHistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrderHistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
