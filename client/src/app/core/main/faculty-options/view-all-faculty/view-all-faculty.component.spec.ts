import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllFacultyComponent } from './view-all-faculty.component';

describe('ViewAllFacultyComponent', () => {
  let component: ViewAllFacultyComponent;
  let fixture: ComponentFixture<ViewAllFacultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllFacultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
