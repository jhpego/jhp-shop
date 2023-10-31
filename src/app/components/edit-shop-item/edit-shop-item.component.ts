import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductCategoryKind, ShopItem } from '../../models/models';
import { EnumToArrayPipe } from 'libs/base/src/pipes/currency.pipe';
import { map, of, tap } from 'rxjs';
import { FormEngineService } from 'libs/base/src/services/form-engine.service';

@Component({
  selector: 'app-edit-shop-item',
  templateUrl: './edit-shop-item.component.html',
  styleUrls: ['./edit-shop-item.component.scss'],
  providers: [EnumToArrayPipe, FormEngineService],
})
export class EditShopItemComponent {
  @Input() shopItem!: ShopItem;

  constructor(
    private fb: FormBuilder,
    private enumToarray: EnumToArrayPipe,
    private formEngineService: FormEngineService
  ) {}

  formShopItem!: FormGroup;

  updateItem() {
    this.formShopItem.patchValue(
      this.shopItem
      //   {
      //   firstName: 'Nancy',
      //   categoryId: 3,
      //   price:
      //   address: {
      //     street: '123 Drew Street',
      //   },
      // }
    );
  }

  categories$ = of(this.enumToarray.transform(ProductCategoryKind)).pipe(
    map((items) =>
      items.map((currItem, idx) => ({
        label: currItem,
        id: idx,
      }))
    ),
    tap((items) => console.warn('items', items))
  );

  ngOnInit() {
    const formProps: any = {
      identifier: [''],
      // lastName: [''],
      // categoryId: [0],
      price: [0],
      product: this.fb.group({
        category: [3],
        // city: [''],
        // state: [''],
        // zip: [''],
      }),
    };

    this.formShopItem = this.formEngineService.createForm(formProps);

    this.updateItem();
  }
}
