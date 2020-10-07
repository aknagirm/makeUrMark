import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordedSessionsComponent } from './recorded-sessions.component';

describe('RecordedSessionsComponent', () => {
  let component: RecordedSessionsComponent;
  let fixture: ComponentFixture<RecordedSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordedSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordedSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
