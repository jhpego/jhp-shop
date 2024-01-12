import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductCategoryKind, ShopItem } from '../../models/models';
import { EnumToArrayPipe } from 'libs/base/src/pipes/currency.pipe';
import { map, of, tap } from 'rxjs';
import { FormEngineService } from 'libs/base/src/services/form-engine.service';
import { ShopItemsService } from '../../services/shop-items.service';
import { UtilitiesService } from 'libs/base/src/services/utilities.service';

@Component({
  selector: 'app-edit-shop-item',
  templateUrl: './edit-shop-item.component.html',
  styleUrls: ['./edit-shop-item.component.scss'],
  providers: [EnumToArrayPipe, FormEngineService],
})
export class EditShopItemComponent {
  @Input() shopItem!: ShopItem;
  @Output() changed: EventEmitter<ShopItem> = new EventEmitter<ShopItem>();

  constructor(
    private fb: FormBuilder,
    private enumToarray: EnumToArrayPipe,
    private formEngineService: FormEngineService,
    private shopItemsService: ShopItemsService,
    private cdr: ChangeDetectorRef,
    private utilitiesService: UtilitiesService
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

  products$ = this.shopItemsService
    .getProducts()
    .pipe(tap((products) => console.warn('products', products)));

  ngOnInit() {
    const formProps: any = {
      title: [''],
      // lastName: [''],
      // categoryId: [0],
      price: [0],
      product: this.fb.group({
        category: [3],
        id: [0],
        // state: [''],
        // zip: [''],
      }),
    };

    this.formShopItem = this.formEngineService.createForm(formProps);

    this.updateItem();
  }

  onSubmit(formShopItem: FormGroup) {
    console.warn('submit', formShopItem);
    // this.shopItem = this.formShopItem.value;

    // this.shopItem.title = this.formShopItem.value.title;

    this.utilitiesService.cloneObjectValues(
      this.shopItem,
      this.formShopItem.value,
      true
    );

    this.changed.emit(this.shopItem);
    this.shopItemsService.shopItemUpdated$.next(this.shopItem);
    this.cdr.detectChanges();
  }
}
