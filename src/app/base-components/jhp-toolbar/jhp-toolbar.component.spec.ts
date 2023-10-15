import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JhpToolbarComponent } from './jhp-toolbar.component';

describe('JhpToolbarComponent', () => {
  let component: JhpToolbarComponent;
  let fixture: ComponentFixture<JhpToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JhpToolbarComponent]
    });
    fixture = TestBed.createComponent(JhpToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
