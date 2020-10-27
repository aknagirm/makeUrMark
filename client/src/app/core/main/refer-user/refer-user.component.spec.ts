import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferUserComponent } from './refer-user.component';

describe('ReferUserComponent', () => {
  let component: ReferUserComponent;
  let fixture: ComponentFixture<ReferUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
