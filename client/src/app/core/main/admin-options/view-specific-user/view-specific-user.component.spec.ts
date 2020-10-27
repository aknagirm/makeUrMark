import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecificUserComponent } from './view-specific-user.component';

describe('ViewSpecificUserComponent', () => {
  let component: ViewSpecificUserComponent;
  let fixture: ComponentFixture<ViewSpecificUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSpecificUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSpecificUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
