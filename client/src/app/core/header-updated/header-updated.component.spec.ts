import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUpdatedComponent } from './header-updated.component';

describe('HeaderUpdatedComponent', () => {
  let component: HeaderUpdatedComponent;
  let fixture: ComponentFixture<HeaderUpdatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderUpdatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
