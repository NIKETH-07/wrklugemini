import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleDialogComponent } from './people-dialog.component';

describe('PeopleDialogComponent', () => {
  let component: PeopleDialogComponent;
  let fixture: ComponentFixture<PeopleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleDialogComponent]
    });
    fixture = TestBed.createComponent(PeopleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
