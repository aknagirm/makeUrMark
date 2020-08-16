import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyProfileEditComponent } from './faculty-profile-edit.component';

describe('FacultyProfileEditComponent', () => {
  let component: FacultyProfileEditComponent;
  let fixture: ComponentFixture<FacultyProfileEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyProfileEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
