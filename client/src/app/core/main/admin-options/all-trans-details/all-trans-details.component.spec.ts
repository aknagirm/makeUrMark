import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTransDetailsComponent } from './all-trans-details.component';

describe('AllTransDetailsComponent', () => {
  let component: AllTransDetailsComponent;
  let fixture: ComponentFixture<AllTransDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTransDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTransDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
