import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JhpLanguageSwitcherComponent } from './jhp-language-switcher.component';

describe('JhpLanguageSwitcherComponent', () => {
  let component: JhpLanguageSwitcherComponent;
  let fixture: ComponentFixture<JhpLanguageSwitcherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JhpLanguageSwitcherComponent]
    });
    fixture = TestBed.createComponent(JhpLanguageSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
