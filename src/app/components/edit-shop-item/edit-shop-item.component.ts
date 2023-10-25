import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ShopItem } from '../../models/models';

@Component({
  selector: 'app-edit-shop-item',
  templateUrl: './edit-shop-item.component.html',
  styleUrls: ['./edit-shop-item.component.scss'],
})
export class EditShopItemComponent {
  @Input() shopItem!: ShopItem;

  constructor(private fb: FormBuilder) {}

  formShopItem = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
  });

  updateItem() {
    this.formShopItem.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }
}
