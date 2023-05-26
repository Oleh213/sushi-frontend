import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTimeEditModalComponent } from './work-time-edit-modal.component';

describe('WorkTimeEditModalComponent', () => {
  let component: WorkTimeEditModalComponent;
  let fixture: ComponentFixture<WorkTimeEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkTimeEditModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkTimeEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
