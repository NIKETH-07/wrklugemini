import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplesidebarComponent } from './peoplesidebar.component';

describe('PeoplesidebarComponent', () => {
  let component: PeoplesidebarComponent;
  let fixture: ComponentFixture<PeoplesidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeoplesidebarComponent]
    });
    fixture = TestBed.createComponent(PeoplesidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
