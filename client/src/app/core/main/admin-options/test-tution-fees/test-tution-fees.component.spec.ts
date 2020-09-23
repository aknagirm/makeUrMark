import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTutionFeesComponent } from './test-tution-fees.component';

describe('TestTutionFeesComponent', () => {
  let component: TestTutionFeesComponent;
  let fixture: ComponentFixture<TestTutionFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTutionFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTutionFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
