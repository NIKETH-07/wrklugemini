import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortDialogComponent } from './port-dialog.component';

describe('PortDialogComponent', () => {
  let component: PortDialogComponent;
  let fixture: ComponentFixture<PortDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortDialogComponent]
    });
    fixture = TestBed.createComponent(PortDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
