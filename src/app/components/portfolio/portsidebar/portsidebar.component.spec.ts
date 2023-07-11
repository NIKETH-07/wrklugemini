import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortsidebarComponent } from './portsidebar.component';

describe('PortsidebarComponent', () => {
  let component: PortsidebarComponent;
  let fixture: ComponentFixture<PortsidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortsidebarComponent]
    });
    fixture = TestBed.createComponent(PortsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
