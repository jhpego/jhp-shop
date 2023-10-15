import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ProductCategoryKind,
  ProductUnitKind,
  ShopItem,
  ShopListMode,
} from '../../models/models';
import { ShopItemsService } from 'src/app/services/shop-items.service';
import {
  MatBottomSheet,
  MatBottomSheetConfig,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {
  // @Output() change: EventEmitter<ShopItem> = new EventEmitter();
  constructor(
    private shopItemsService: ShopItemsService,
    private cdr: ChangeDetectorRef
  ) {}

  ShopListMode = ShopListMode;
  itemsList: ShopItem[] = [];

  ngOnInit() {
    this.shopItemsService.itemsList$.subscribe((res) => {
      this.itemsList = res;
      this.cdr.detectChanges();
    });
  }

  public get itemsTotal() {
    return this.shopItemsService
      .getAquired()
      .reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
  }

  // onItemChanged(item: ShopItem) {
  //   console.warn('item changed on shop');
  //   this.cdr.detectChanges();
  //   // this.change.emit(item);
  // }

  getAquired() {
    return this.itemsList.filter((item) => item.aquired);
  }

  getNotAquired() {
    return this.itemsList.filter((item) => !item.aquired);
  }
}
