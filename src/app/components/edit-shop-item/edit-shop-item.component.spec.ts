import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShopItemComponent } from './edit-shop-item.component';

describe('EditShopItemComponent', () => {
  let component: EditShopItemComponent;
  let fixture: ComponentFixture<EditShopItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditShopItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditShopItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
