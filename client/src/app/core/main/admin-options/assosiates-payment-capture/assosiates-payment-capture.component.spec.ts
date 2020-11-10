import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssosiatesPaymentCaptureComponent } from './assosiates-payment-capture.component';

describe('AssosiatesPaymentCaptureComponent', () => {
  let component: AssosiatesPaymentCaptureComponent;
  let fixture: ComponentFixture<AssosiatesPaymentCaptureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssosiatesPaymentCaptureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssosiatesPaymentCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
