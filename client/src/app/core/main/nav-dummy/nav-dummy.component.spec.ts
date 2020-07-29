import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDummyComponent } from './nav-dummy.component';

describe('NavDummyComponent', () => {
  let component: NavDummyComponent;
  let fixture: ComponentFixture<NavDummyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavDummyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavDummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
