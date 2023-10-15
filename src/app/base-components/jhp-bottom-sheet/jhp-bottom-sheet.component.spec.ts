import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JhpBottomSheetComponent } from './jhp-bottom-sheet.component';

describe('JhpBottomSheetComponent', () => {
  let component: JhpBottomSheetComponent;
  let fixture: ComponentFixture<JhpBottomSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JhpBottomSheetComponent]
    });
    fixture = TestBed.createComponent(JhpBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
