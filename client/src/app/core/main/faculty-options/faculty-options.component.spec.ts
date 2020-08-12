import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyOptionsComponent } from './faculty-options.component';

describe('FacultyOptionsComponent', () => {
  let component: FacultyOptionsComponent;
  let fixture: ComponentFixture<FacultyOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
