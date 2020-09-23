import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeBoardSubBatchComponent } from './grade-board-sub-batch.component';

describe('GradeBoardSubBatchComponent', () => {
  let component: GradeBoardSubBatchComponent;
  let fixture: ComponentFixture<GradeBoardSubBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeBoardSubBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeBoardSubBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
