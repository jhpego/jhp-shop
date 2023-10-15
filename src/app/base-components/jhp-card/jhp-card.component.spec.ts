import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JhpCardComponent } from './jhp-card.component';

describe('JhpCardComponent', () => {
  let component: JhpCardComponent;
  let fixture: ComponentFixture<JhpCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JhpCardComponent]
    });
    fixture = TestBed.createComponent(JhpCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
