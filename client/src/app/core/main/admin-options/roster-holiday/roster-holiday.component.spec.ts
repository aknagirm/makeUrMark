import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterHolidayComponent } from './roster-holiday.component';

describe('RosterHolidayComponent', () => {
  let component: RosterHolidayComponent;
  let fixture: ComponentFixture<RosterHolidayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterHolidayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
