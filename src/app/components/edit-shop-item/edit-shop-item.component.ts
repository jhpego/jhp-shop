import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ProductCategoryKind,
  ProductUnitKind,
  ShopItem,
  ShopListAction,
} from '../../models/models';
import { EnumToArrayPipe } from 'libs/base/src/pipes/currency.pipe';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  map,
  of,
  startWith,
  tap,
} from 'rxjs';
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
  @Input() isNew!: boolean;
  @Output() changed: EventEmitter<ShopListAction> =
    new EventEmitter<ShopListAction>();

  constructor(
    private fb: FormBuilder,
    private enumToarray: EnumToArrayPipe,
    private formEngineService: FormEngineService,
    private shopItemsService: ShopItemsService,
    private cdr: ChangeDetectorRef,
    private utilitiesService: UtilitiesService
  ) {}

  // formProps: any = ;

  categorySelected$ = new BehaviorSubject<number>(-1);

  formShopItem: FormGroup = this.formEngineService.createForm({
    title: [''],
    // lastName: [''],
    categoryId: [0],
    price: [0],
    product: this.fb.group({
      category: [0],
      id: [0],
      // state: [''],
      // zip: [''],
    }),
  });

  updateFormItem() {
    this.formShopItem.patchValue(this.shopItem);
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

  products$ = combineLatest([
    this.shopItemsService.getProducts(),
    this.categorySelected$,
  ]).pipe(
    tap(([products, currCategoryId]) =>
      console.warn('products by category', currCategoryId, products)
    ),
    map(([products, currCategoryId]) => {
      if (currCategoryId >= 0) {
        return products.filter((prd) => prd.category == currCategoryId);
      }
      return products;
    })
  );

  ngOnInit() {
    // this.formShopItem = ;

    if (this.isNew) {
      this.shopItem = {
        title: '',
        status: 1,
        quantity: 1,
        price: 0,
        productId: 0,
        product: {
          category: 0,
          identifier: '',
          unit: ProductUnitKind.Unit,
          preview: '',
        },
      };
    }

    this.categorySelected$.next(this.shopItem.product.category);

    this.updateFormItem();
  }

  onSubmit(formShopItem: FormGroup) {
    console.warn('submit', formShopItem);
    this.utilitiesService.cloneObjectValues(
      this.shopItem,
      this.formShopItem.value,
      true
    );
    this.changed.emit({
      action: this.isNew ? 'create' : 'update',
      payload: this.shopItem,
    });
  }

  onProductChanged(product: any) {
    console.warn('product changed: ', product);
    this.shopItem.product = product;
    this.updateFormItem();
  }

  onCategoryChanged(category: any) {
    this.categorySelected$.next(category.id);
  }

  onRemoveItem() {
    this.changed.emit({
      action: 'remove',
      payload: this.shopItem,
    });
  }
}
