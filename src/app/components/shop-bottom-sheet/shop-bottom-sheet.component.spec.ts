import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBottomSheetComponent } from './shop-bottom-sheet.component';

describe('ShopBottomSheetComponent', () => {
  let component: ShopBottomSheetComponent;
  let fixture: ComponentFixture<ShopBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
